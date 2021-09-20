<template>
  <FormulateForm>
    <div>
      <!-- Counter Arguments -->
      <forms-form-section
        :title="$t('forms.counter_arguments.question')"
        :subtitle="$t('forms.counter_arguments.help')"
        :locked="fieldIsLocked('counter_arguments')"
        :locked-text="setLockedFieldText('counter_arguments')"
      >
        <draggable
          :list="counterArguments"
          :sort="true"
          ghost-class="ghost"
          handle=".handle"
          @update="
            updatePriority(
              counterArguments,
              'counter_arguments',
              'counter_arguments'
            )
          "
          @start="setLockedField('counter_arguments')"
        >
          <transition-group tag="ul" type="transition" name="flip-list">
            <li
              v-for="counterArgument in counterArguments"
              :key="counterArgument.id"
              class="flex flex-col w-full justify-center items-center mb-8"
            >
              <forms-collaboration-group-input
                :model="counterArgument"
                sub-field="negations"
                :options="{
                  primaryPlaceholder: $t(
                    'forms.counter_arguments.placeholder.description'
                  ),
                  primaryValidationName: $t(
                    'validation.name.counter_arguments.description'
                  ),
                  subPlaceholder: $t('validation.name.arguments.negations'),
                  subValidationName: $t(
                    'forms.counter_arguments.placeholder.negations'
                  ),
                }"
                @primary-validation="validationCounterArguments = $event"
                @primary-focus="setLockedField('counter_arguments')"
                @primary-focusout="
                  !validationCounterArguments.hasErrors
                    ? updateEntity(
                        'counter_arguments',
                        { description: $event },
                        counterArgument.id,
                        'counter_arguments'
                      )
                    : {}
                "
                @primary-delete="
                  deleteEntity('counter_arguments', $event, 'counter_arguments')
                "
                @sub-validation="validationNegations = $event"
                @sub-focus="setLockedField('counter_arguments')"
                @sub-focusout="
                  !validationNegations.hasErrors
                    ? createOrUpdateNegations(counterArgument, $event)
                    : {}
                "
                @sub-delete="deleteNegation($event)"
                @add-focus="setLockedField('counter_arguments')"
                @add-focusout="
                  !validationNegations.hasErrors
                    ? createOrUpdateNegations(counterArgument, $event)
                    : {}
                "
              />
            </li>
          </transition-group>
        </draggable>
        <div class="border-t-2 pt-6">
          <forms-project-create-counter-arguments
            :form-key="formKey"
            @submit="createCounterArguments($event)"
          >
          </forms-project-create-counter-arguments>
        </div>
      </forms-form-section>

      <!-- Arguments -->
      <forms-form-section
        :title="$t('forms.arguments.question')"
        :locked="fieldIsLocked('arguments')"
        :locked-text="setLockedFieldText('arguments')"
      >
        <draggable
          :list="argumentations"
          :sort="true"
          ghost-class="ghost"
          handle=".handle"
          @update="updatePriority(argumentations, 'arguments', 'arguments')"
          @start="setLockedField('arguments')"
        >
          <transition-group tag="ul" type="transition" name="flip-list">
            <li
              v-for="argumentation in argumentations"
              :key="argumentation.id"
              class="flex flex-col w-full justify-center items-center"
            >
              <forms-collaboration-input
                :model="argumentation.description"
                name="description"
                type="text"
                :input-type="2"
                :validation-name="$t('validation.name.arguments.description')"
                validation="required"
                @validation="validationArguments = $event"
                @focusout="
                  !validationArguments.hasErrors
                    ? updateEntity(
                        'arguments',
                        { description: $event.target.value },
                        argumentation.id,
                        'arguments'
                      )
                    : {}
                "
                @focus="setLockedField('arguments')"
                @delete="
                  deleteEntity('arguments', argumentation.id, 'arguments')
                "
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
                      class="w-5 h-5 bg-white rounded-sm text-gray-500"
                    ></outline-menu-alt-4-icon>
                    <outline-thumb-up-icon
                      class="w-5 h-5 text-green-500"
                    ></outline-thumb-up-icon>
                    <span class="text-green-500"> Pro </span>
                  </div>
                </template>
              </forms-collaboration-input>
            </li>
          </transition-group>
        </draggable>

        <div class="border-t-2 pt-6">
          <forms-project-create-arguments
            :form-key="formKey"
            @submit="createArgumentType('arguments', $event)"
          >
          </forms-project-create-arguments>
        </div>
      </forms-form-section>
    </div>
  </FormulateForm>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useContext,
} from '@nuxtjs/composition-api'

import { cloneDeep } from 'lodash'

import { IArgument, ICounterArgument, IProposal } from '~/types/apiSchema'
import editApplication from '~/composables/editApplication'
import { IValidation } from '~/types/vueFormulate'
import collaborations from '~/composables/collaborations'

export default defineComponent({
  name: 'Arguments',
  setup() {
    const argumentations = ref<IArgument[]>([])
    const counterArguments = ref<ICounterArgument[]>([])

    /*
 workaround for resetting form and validation because
 $formulate plugin is not support for vue 3 composition aoi now
 */
    const formKey = ref(1)

    const context = useContext()

    const {
      createProjectEntity,
      deleteProjectEntity,
      updateProjectEntity,
      project,
    } = editApplication()

    const {
      recentProjectSaved,
      projectSaved,
      setLockedField,
      fieldIsLocked,
      setLockedFieldText,
      resetLockedField,
      setFieldUpdated,
    } = collaborations()

    watch(
      project,
      (currentValue) => {
        argumentations.value = cloneDeep(currentValue?.arguments || [])
        // @ts-ignore
        argumentations.value.sort((a, b) => b.priority - a.priority)
        counterArguments.value = cloneDeep(currentValue?.counterArguments || [])
        // @ts-ignore
        counterArguments.value.sort((a, b) => b.priority - a.priority)
      },
      { deep: true, immediate: true }
    )

    const validationArguments = ref<IValidation>({ hasErrors: false })
    const validationCounterArguments = ref<IValidation>({ hasErrors: false })
    const validationNegations = ref<IValidation>({ hasErrors: false })

    const createCounterArguments = async (
      formData: IArgument | ICounterArgument
    ) => {
      await createArgumentType('counter_arguments', formData).then(() =>
        setFieldUpdated('counter_arguments')
      )
    }

    const createArgumentType = async (
      endpoint: string,
      formData: IArgument | ICounterArgument
    ) => {
      if (project.value) {
        const payload = {
          ...formData.value,
          project: project.value['@id'],
        }
        return await createProjectEntity<IArgument | ICounterArgument>(
          endpoint,
          payload
        ).then((res) => {
          formKey.value++
          setFieldUpdated('arguments')
          return res
        })
      }
    }

    const updateEntity = async (
      endpoint: string,
      data: IProposal | IArgument | ICounterArgument,
      id: string | number,
      fieldName: string
    ) => {
      if (project.value && typeof project.value['@id'] === 'string') {
        const payload: IProposal | IArgument | ICounterArgument = {
          ...data,
          project: project.value['@id'],
        }
        await updateProjectEntity<IArgument | IProposal | ICounterArgument>(
          endpoint,
          id,
          payload
        ).then(() => {
          setFieldUpdated(fieldName)
        })
      }
    }

    const deleteEntity = async (
      endpoint: string,
      id: number | string,
      fieldName: string
    ) => {
      // @ts-ignore
      await deleteProjectEntity<IArgument | ICounterArgument>(
        endpoint,
        id
      ).then(() => {
        setFieldUpdated(fieldName)
      })
    }

    const updatePriority = async (
      entity: ICounterArgument | IArgument,
      endpoint: string,
      fieldName: string
    ) => {
      const allAsyncResults: Promise<any>[] = []

      for (let index = 0; index < entity.length; index++) {
        const payload: ICounterArgument | IArgument = {
          priority: entity.length - (index + 1),
        }
        // @ts-ignore
        const asyncResult: any = await context.$api[endpoint].update(
          entity[index].id,
          payload
        )

        allAsyncResults.push(asyncResult)
      }
      await Promise.all(allAsyncResults).then(() => {
        setFieldUpdated(fieldName)
      })
    }

    // @ts-ignore
    const deleteNegation = async (id) => {
      // @ts-ignore
      await context.$api.negations.delete(id).then(() => setFieldUpdated())
    }

    const createOrUpdateNegations = async (
      counterArgument: ICounterArgument,
      data: { value: string; id: string }
    ) => {
      const payload = {
        description: data.value,
        counterArgument: counterArgument['@id'],
      }
      if (data?.id) {
        // @ts-ignore
        await context.$api.negations
          .update(data.id, payload)
          .then(() => setFieldUpdated('counter_arguments'))
      } else {
        // @ts-ignore
        await context.$api.negations
          .create(payload)
          .then(() => setFieldUpdated('counter_arguments'))
      }
    }

    return {
      argumentations,
      counterArguments,
      formKey,
      validationArguments,
      validationCounterArguments,
      validationNegations,
      createArgumentType,
      updateEntity,
      deleteEntity,
      deleteNegation,
      updatePriority,
      createCounterArguments,
      createOrUpdateNegations,
      recentProjectSaved,
      projectSaved,
      setLockedField,
      fieldIsLocked,
      setLockedFieldText,
      resetLockedField,
      setFieldUpdated,
    }
  },
})
</script>
