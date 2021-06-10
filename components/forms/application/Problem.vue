<template>
  <FormulateForm>
    <forms-layout title="Probleme und Handlungsfelder" no-actions>
      <div class="space-y-6">
        <forms-form-section
          title="Welche Probleme hast du beobachtet und möchtest angeben?"
          subtitle="Gebe den Problemen eine Gewichtung indem du ihre Reihenfolge änderst."
        >
          <draggable
            :list="problems"
            :sort="true"
            ghost-class="ghost"
            @update="updateProblemPriority($event)"
          >
            <transition-group tag="ul" type="transition" name="flip-list">
              <li
                v-for="problem in problems"
                :key="problem.id"
                class="inline-flex w-full justify-center cursor-move"
              >
                <FormulateInput
                  :value="problem.description"
                  name="description"
                  type="text"
                  element-class="inline-flex w-full"
                  validation="required"
                  @validation="validation = $event"
                  @focusout="updateProblem($event.target.value, problem.id)"
                >
                  <template #prefix>
                    <div>
                      <outline-arrows-expand-icon class="h-10 w-10 pr-4" />
                    </div>
                  </template>
                </FormulateInput>
                <FormulateInput
                  input-class="ml-4 form-button"
                  type="button"
                  @click="deleteProblem(problem.id)"
                  ><outline-trash-icon class="h-5 w-5"
                /></FormulateInput>
              </li>
            </transition-group>
          </draggable>
          <FormulateForm
            ref="problemForm"
            v-model="createProblemForm"
            @submit="createProblem()"
          >
            <div class="inline-flex w-full justify-between">
              <FormulateInput
                type="text"
                name="description"
                validation="required"
                validation-name="Problembeschreibung"
                :key="formKey"
                error-behavior="submit"
              />
              <FormulateInput input-class="ml-4 form-button" type="submit"
                >+ Hinzufügen</FormulateInput
              >
            </div>
          </FormulateForm>
          <!--          <FormulateInput
            type="group"
            :repeatable="true"
            name="problems"
            aria-label="Welche Probleme hast du beobachtet und möchtest du anlegen?"
            add-label="+ Problem hinzufügen"
            remove-position="after"
          >
            <FormulateInput name="description" type="text" />
          </FormulateInput>-->
          <!--        </forms-form-section>
        <forms-form-section
          title="Handlungsauftrag"
          subtitle="Was sollte die Stadtverwaltung tun, um das Problem anzugehen"
        >
          <div class="inline-flex w-full justify-between">
            <FormulateInput name="description" type="text" />
            <FormulateInput input-class="ml-4 form-button" type="button"
              ><outline-x-icon class="h-4 w-4"
            /></FormulateInput>
          </div>
          <div class="inline-flex w-full justify-between">
            <FormulateInput type="text" />
            <FormulateInput input-class="ml-4 form-button" type="button"
              >Hinzufügen</FormulateInput
            >
          </div>-->
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
  setup(context) {
    const { createEntity, deleteEntity, updateEntity, project } =
      editApplication()

    const problems = ref<IProblem[]>([])
    const createProblemForm = ref<ProblemForm>({})

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
        await createEntity<IProblem>('problems', problems.value, payload).then(
          () => {
            formKey.value++
          }
        )
      }
    }
    const deleteProblem = async (id: number | string) => {
      // @ts-ignore
      await deleteEntity('problems', id, problems.value)
    }

    const updateProblem = async (desc: string, id: number | string) => {
      if (!validation.value.hasErrors) {
        const payload = {
          description: desc,
        }
        await updateEntity<IProblem>('problems', id, payload)
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

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.flip-list-move {
  transition: transform 0.5s;
}
</style>
