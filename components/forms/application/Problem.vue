<template>
  <FormulateForm>
    <forms-layout title="Probleme und Handlungsfelder" no-actions>
      <div class="space-y-6">
        <forms-form-section
          :title="$t('forms.problems.title')"
          :subtitle="$t('forms.problems.introduction')"
        >
          <draggable
            :list="problems"
            :sort="true"
            ghost-class="ghost"
            handle=".handle"
            @update="updateProblemPriority($event)"
          >
            <transition-group tag="ul" type="transition" name="flip-list">
              <li
                v-for="problem in problems"
                :key="problem.id"
                class="inline-flex w-full justify-center cursor-move"
              >
                <forms-list-item-input
                  :value="problem.description"
                  name="description"
                  type="text"
                  element-class="inline-flex w-full"
                  validation="required"
                  :placeholder="$t('forms.problems.placeholder.description')"
                  :validation-name="$t('validation.problems.description')"
                  @validation="validation = $event"
                  @focusout="updateProblem($event, problem.id)"
                  @delete="deleteProblem(problem.id)"
                >
                  <template #prefix>
                    <div
                      class="
                        inline-flex
                        items-center
                        space-x-2
                        pr-4
                        handle
                        cursor-move
                      "
                    >
                      <outline-menu-alt-4-icon
                        class="w-5 h-5"
                      ></outline-menu-alt-4-icon>
                      <outline-shield-exclamation-icon
                        class="w-5 h-5"
                      ></outline-shield-exclamation-icon>
                    </div>
                  </template>
                </forms-list-item-input>
              </li>
            </transition-group>
          </draggable>
          <div class="border-t-2 pt-6">
            <FormulateForm
              ref="problemForm"
              v-model="createProblemForm"
              @submit="createProblem()"
            >
              <FormulateInput
                :key="formKey"
                type="text"
                name="description"
                validation="required"
                :validation-name="$t('validation.problems.description')"
                error-behavior="submit"
                input-class="list-input-text"
                :placeholder="$t('forms.problems.placeholder.description')"
              />
              <FormulateInput type="submit">
                <outline-thumb-down-icon class="h-5 w-5 text-red-500" />
                <span class="text-red-500 pl-4">{{
                  $t('forms.problems.add')
                }}</span>
              </FormulateInput>
            </FormulateForm>
          </div>
        </forms-form-section>
      </div>
    </forms-layout>
  </FormulateForm>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  watch,
  ref,
  useStore,
  useContext,
} from '@nuxtjs/composition-api'
import { cloneDeep } from 'lodash'
import { IProblem } from '~/types/apiSchema'
import { RootState } from '~/store'

import editApplication from '~/composables/editApplication'
import { IValidation } from '~/types/vueFormulate'

interface ProblemForm {
  problems?: IProblem[]
  description?: string
  project?: string
}

export default defineComponent({
  name: 'Problem',
  setup() {
    const {
      createProjectEntity,
      deleteProjectEntity,
      updateProjectEntity,
      project,
    } = editApplication()

    const problems = ref<IProblem[]>([])
    const createProblemForm = ref<ProblemForm>({})

    const context = useContext()

    /*
     workaround for resetting form and validation because
     $formulate plugin is not support for vue 3 now
     */
    const validation = ref<IValidation>({ hasErrors: false })
    const formKey = ref(1)

    const store = useStore<RootState>()

    onMounted(() => {
      if (project.value?.problems) {
        problems.value = cloneDeep(project.value.problems)
        problems.value.sort((a, b) => b.priority - a.priority)
      }
    })

    watch(
      project,
      (currentValue) => {
        problems.value = cloneDeep(currentValue?.problems || [])
        problems.value.sort((a, b) => b.priority - a.priority)
      },
      {
        deep: true, // immediate: true
      }
    )

    const createProblem = async () => {
      if (project.value) {
        const payload: ProblemForm = {
          description: createProblemForm.value.description,
          project: project.value['@id'],
        }
        await createProjectEntity<IProblem>(
          'problems',
          problems.value,
          payload
        ).then(() => {
          formKey.value++
        })
      }
    }
    const deleteProblem = async (id: number | string) => {
      // @ts-ignore
      await deleteProjectEntity('problems', id, problems.value)
    }

    const updateProblem = async (desc: string, id: number | string) => {
      if (!validation.value.hasErrors) {
        const payload = {
          description: desc,
        }
        await updateProjectEntity<IProblem>('problems', id, payload)
      }
    }

    const updateProblemPriority = async () => {
      const allAsyncResults: Promise<any>[] = []

      for (let index = 0; index < problems.value.length; index++) {
        const payload: IProblem = {
          priority: problems.value.length - (index + 1),
        }
        const asyncResult: any = await context.$axios
          .put('/problems/' + problems.value[index].id, {
            ...payload,
          })
          .then()
          .catch()
          .finally()
        allAsyncResults.push(asyncResult)
      }
      await Promise.all(allAsyncResults).then((res) => {
        store.dispatch('projects/updateProjectProperty', [
          'problems',
          res.map((e) => e.data),
        ])
      })
    }
    return {
      problems,
      formKey,
      createProblemForm,
      validation,
      deleteProblem,
      createProblem,
      updateProblem,
      updateProblemPriority,
    }
  },
})
</script>
