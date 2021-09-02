<template>
  <FormulateForm>
    <div class="space-y-6">
      <forms-form-section
        :title="$t('forms.problems.actionMandate.title')"
        :subtitle="$t('forms.problems.actionMandate.introduction')"
        :locked="fieldIsLocked('problem_action_mandate')"
        :locked-text="setLockedFieldText('problem_action_mandate')"
      >
        <draggable
          :list="actionMandates"
          :sort="true"
          ghost-class="ghost"
          handle=".handle"
          @update="updateActionMandatePriority($event)"
          @start="setLockedField('problem_action_mandate')"
        >
          <transition-group tag="ul" type="transition" name="flip-list">
            <li
              v-for="actionMandate in actionMandates"
              :key="actionMandate.id"
              class="inline-flex w-full justify-center cursor-move"
            >
              <forms-collaboration-input
                :model="actionMandate.description"
                name="description"
                type="text"
                :input-type="2"
                validation="required"
                :placeholder="
                  $t('forms.problems.actionMandate.placeholder.description')
                "
                :validation-name="
                  $t('validation.problems.actionMandate.description')
                "
                @validation="validation = $event"
                @focusout="
                  updateActionMandate($event.target.value, actionMandate.id)
                "
                @focus="setLockedField('problem_action_mandate')"
                @delete="deleteActionMandate(actionMandate.id)"
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
                      class="w-5 h-5 bg-white rounded-sm"
                    ></outline-menu-alt-4-icon>
                  </div>
                </template>
              </forms-collaboration-input>
            </li>
          </transition-group>
        </draggable>
        <div class="border-t-2 pt-6">
          <FormulateForm
            v-if="newActionMandateForm"
            ref="problemForm"
            v-model="createProblemForm"
            class="flex items-center"
            @submit="createProblem()"
          >
            <FormulateInput
              :key="formKey"
              type="text"
              name="description"
              validation="required"
              :validation-name="
                $t('validation.problems.actionMandate.description')
              "
              error-behavior="submit"
              :placeholder="
                $t('forms.problems.actionMandate.placeholder.description')
              "
            />
            <button type="submit" class="w-12 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-green-500 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </FormulateForm>
          <base-button
            v-if="!newActionMandateForm"
            class="
              bg-white
              text-purple-500
              border border-gray-400
              flex
              items-center
              hover:text-white hover:bg-purple-500
            "
            @click="openActionMandateForm"
          >
            {{ $t('forms.problems.actionMandate.add') }}</base-button
          >
          <div
            v-if="newActionMandateForm"
            class="text-red-500 text-sm cursor-pointer text-right"
            @click="closeActionMandateForm"
          >
            Abbrechen
          </div>
        </div>
      </forms-form-section>
    </div>
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
import collaborations from '~/composables/collaborations'

interface MandateForm {
  problems?: IProblem[]
  description?: string
  project?: string
}

export default defineComponent({
  name: 'ActionMandateForm',
  setup() {
    const {
      createProjectEntity,
      deleteProjectEntity,
      updateProjectEntity,
      project,
    } = editApplication()

    const actionMandates = ref<IProblem[]>([])
    const createProblemForm = ref<MandateForm>({})

    const actionMandateDescriptions = ref([])

    const context = useContext()

    const {
      setLockedField,
      fieldIsLocked,
      setLockedFieldText,
      resetLockedField,
      setFieldUpdated,
    } = collaborations()

    /*
     workaround for resetting form and validation because
     $formulate plugin is not support for vue 3 now
     */
    const validation = ref<IValidation>({ hasErrors: false })
    const formKey = ref(1)

    onMounted(() => {
      if (project.value?.actionMandates) {
        actionMandates.value = cloneDeep(project.value.actionMandates)
        actionMandates.value.sort((a, b) => b.priority - a.priority)
      }
    })

    watch(
      project,
      (currentValue) => {
        actionMandates.value = cloneDeep(currentValue?.actionMandates || [])
        actionMandates.value.sort((a, b) => b.priority - a.priority)
      },
      {
        immediate: true,
        deep: true,
      }
    )

    const createProblem = async () => {
      if (project.value) {
        const payload: MandateForm = {
          description: createProblemForm.value.description,
          project: project.value['@id'],
        }
        await createProjectEntity<IProblem>('action_mandates', payload).then(
          () => {
            formKey.value++
            newActionMandateForm.value = false
            setFieldUpdated()
          }
        )
      }
    }
    const deleteActionMandate = async (id: number | string) => {
      // @ts-ignore#
      await deleteProjectEntity('action_mandates', id).then(() => {
        setFieldUpdated()
      })
    }

    const updateActionMandate = async (desc: string, id: number | string) => {
      if (!validation.value.hasErrors) {
        const payload = {
          description: desc,
        }
        await updateProjectEntity<IProblem>(
          'action_mandates',
          id,
          payload
        ).then(() => {
          setFieldUpdated()
        })
      }
    }

    const updateActionMandatePriority = async () => {
      const allAsyncResults: Promise<any>[] = []

      for (let index = 0; index < actionMandates.value.length; index++) {
        const payload: IProblem = {
          priority: actionMandates.value.length - (index + 1),
        }
        const asyncResult: any = await context.$axios
          .put('/action_mandates/' + actionMandates.value[index].id, {
            ...payload,
          })
          .then()
          .catch()
          .finally()
        allAsyncResults.push(asyncResult)
      }
      await Promise.all(allAsyncResults).then((res) => {
        setFieldUpdated()
      })
    }

    const newActionMandateForm = ref(false)

    const openActionMandateForm = () => {
      setLockedField('problem_action_mandate')
      newActionMandateForm.value = true
    }

    const closeActionMandateForm = () => {
      resetLockedField()
      newActionMandateForm.value = false
    }

    return {
      actionMandates,
      formKey,
      createProblemForm,
      validation,
      deleteActionMandate,
      createProblem,
      updateActionMandate,
      updateActionMandatePriority,
      newActionMandateForm,
      openActionMandateForm,
      closeActionMandateForm,
      fieldIsLocked,
      setLockedField,
      resetLockedField,
      setLockedFieldText,
      actionMandateDescriptions,
    }
  },
})
</script>
