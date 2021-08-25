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
          @update="updatePriority(counterArguments, 'counter_arguments')"
          @start="setLockedField('counter_arguments')"
        >
          <transition-group tag="ul" type="transition" name="flip-list">
            <li
              v-for="(
                counterArgument, counterArgumentIndex
              ) in counterArguments"
              :key="counterArgument.id"
              class="flex flex-col w-full justify-center items-center mb-8"
            >
              <forms-list-item-input
                :model="counterArgumentDescriptions[counterArgumentIndex]"
                name="description"
                type="text"
                :placeholder="
                  $t('forms.counter_arguments.placeholder.description')
                "
                :validation-name="
                  $t('validation.name.counter_arguments.description')
                "
                validation="required"
                @validation="validationCounterArguments = $event"
                @focus="setLockedField('counter_arguments')"
                @focusout="
                  !validationCounterArguments.hasErrors
                    ? updateEntity(
                        'counter_arguments',
                        { description: $event.target.value },
                        counterArgument.id
                      )
                    : {}
                "
                @delete="
                  deleteEntity(
                    'counter_arguments',
                    counterArgument.id,
                    counterArguments
                  )
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
                    <outline-thumb-down-icon
                      class="w-5 h-5 text-red-500"
                    ></outline-thumb-down-icon>
                    <span class="text-red-500">{{
                      $t('forms.counter_arguments.cons')
                    }}</span>
                  </div>
                </template>
              </forms-list-item-input>

              <forms-list-item-input
                v-for="(negation, index) in counterArgument.negations"
                :key="negation.id"
                :input-type="2"
                :model="negation.description"
                name="description"
                type="text"
                :validation-name="$t('validation.name.arguments.negations')"
                :placeholder="
                  $t('forms.counter_arguments.placeholder.negations')
                "
                validation="required"
                @validation="validationNegations = $event"
                @focus="setLockedField('counter_arguments')"
                @focusout="
                  !validationNegations.hasErrors
                    ? createOrUpdateNegations(
                        counterArgument.negations &&
                          counterArgument.negations[index]
                          ? counterArgument.negations[index].id
                          : null,
                        counterArgumentIndex,
                        counterArgument,
                        index,
                        $event.target.value
                      )
                    : {}
                "
                @delete="
                  deleteNegation(
                    negation.id,
                    counterArgumentIndex,
                    counterArgument.negations
                  )
                "
              >
                <template #prefix>
                  <div class="inline-flex items-center space-x-2 px-4">
                    <outline-chat-alt-2-icon
                      class="w-5 h-5"
                    ></outline-chat-alt-2-icon>
                  </div>
                </template>
              </forms-list-item-input>
              <forms-list-item-input
                v-if="newNegationForm"
                :input-type="2"
                name="description"
                type="text"
                :validation-name="$t('validation.name.arguments.negations')"
                :placeholder="
                  $t('forms.counter_arguments.placeholder.negations')
                "
                validation="required"
              >
                <!--
               inline-flex@focusout="
                 !validationNegations.hasErrors
                   ? createOrUpdateNegations(
                       counterArgument.negations &&
                         counterArgument.negations[index]
                         ? counterArgument.negations[index].id
                         : null,
                       counterArgumentIndex,
                       counterArgument,
                       index,
                       $event.target.value
                     )
                   : {}-->

                <template #prefix>
                  <div
                    class="items-center space-x-2 px-4"
                    @validation="validationNegations = $event"
                    @focus="setLockedField('counter_arguments')"
                  >
                    <outline-chat-alt-2-icon
                      class="w-5 h-5"
                    ></outline-chat-alt-2-icon>
                  </div>
                </template>
              </forms-list-item-input>
              <FormulateInput
                input-class="flex space-x-2  mt-4 text-purple-500"
                type="button"
                @click="openForm('newNegationForm')"
              >
                <outline-plus-icon class="w-6 h-6"></outline-plus-icon>
                <span class="">{{
                  $t('forms.counter_arguments.add_counter')
                }}</span>
              </FormulateInput>
            </li>
          </transition-group>
        </draggable>
        <div class="border-t-2 pt-6">
          <forms-project-create-counter-arguments
            v-if="newCounterArgumentForm"
            :form-key="formKey"
            @submit="createCounterArguments($event)"
          >
          </forms-project-create-counter-arguments>
          <base-button
            v-if="!newCounterArgumentForm"
            class="
              bg-white
              text-red-500
              border border-gray-400
              flex
              items-center
              hover:text-white hover:bg-red-500
            "
            @click="openForm('newCounterArgumentForm')"
          >
            <outline-thumb-down-icon class="h-4 w-4 mr-2" />
            Gegenargument hinzufügen</base-button
          >
          <div
            v-if="newCounterArgumentForm"
            class="text-red-500 text-sm cursor-pointer text-right"
            @click="closeForm('newCounterArgumentForm')"
          >
            Abbrechen
          </div>
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
          @update="updatePriority(argumentations, 'arguments')"
          @start="setLockedField('arguments')"
        >
          <transition-group tag="ul" type="transition" name="flip-list">
            <li
              v-for="(argumentation, index) in argumentations"
              :key="argumentation.id"
              class="flex flex-col w-full justify-center items-center"
            >
              <forms-list-item-input
                :model="argumentDescription[index]"
                name="description"
                type="text"
                :validation-name="$t('validation.name.arguments.description')"
                validation="required"
                @validation="validationArguments = $event"
                @focusout="
                  !validationArguments.hasErrors
                    ? updateEntity(
                        'arguments',
                        { description: $event.target.value },
                        argumentation.id
                      )
                    : {}
                "
                @focus="setLockedField('arguments')"
                @delete="
                  deleteEntity('arguments', argumentation.id, argumentations)
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
              </forms-list-item-input>
            </li>
          </transition-group>
        </draggable>

        <div class="border-t-2 pt-6">
          <forms-project-create-arguments
            v-if="newArgumentForm"
            :form-key="formKey"
            @submit="createArgumentType('arguments', argumentations, $event)"
          >
          </forms-project-create-arguments>
          <base-button
            v-if="!newArgumentForm"
            class="
              bg-white
              text-green-500
              border border-gray-400
              flex
              items-center
              hover:text-white hover:bg-green-500
            "
            @click="openForm('newArgumentForm')"
          >
            <outline-thumb-up-icon class="h-4 w-4 mr-2" /> Argument
            hinzufügen</base-button
          >
          <div
            v-if="newArgumentForm"
            class="text-red-500 text-sm cursor-pointer text-right"
            @click="closeForm('newArgumentForm')"
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
  ref,
  watch,
  useStore,
  useContext,
} from '@nuxtjs/composition-api'

import { camelCase, cloneDeep } from 'lodash'

import { IArgument, ICounterArgument, IProposal } from '~/types/apiSchema'
import editApplication from '~/composables/editApplication'
import { IValidation } from '~/types/vueFormulate'
import { RootState } from '~/store'
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

    const store = useStore<RootState>()
    const context = useContext()

    const counterArgumentDescriptions = ref([])
    const argumentDescription = ref([])

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
        argumentDescription.value = argumentations.value.map(
          (argument) => argument.description
        )
        counterArguments.value = cloneDeep(currentValue?.counterArguments || [])
        // @ts-ignore
        counterArguments.value.sort((a, b) => b.priority - a.priority)
        counterArgumentDescriptions.value = counterArguments.value.map(
          (counterArgument) => counterArgument.description
        )
      },
      { deep: true, immediate: true }
    )

    const validationArguments = ref<IValidation>({ hasErrors: false })
    const validationCounterArguments = ref<IValidation>({ hasErrors: false })
    const validationNegations = ref<IValidation>({ hasErrors: false })

    const createCounterArguments = async (
      formData: IArgument | ICounterArgument
    ) => {
      await createArgumentType(
        'counter_arguments',
        counterArguments.value,
        formData
      ).then(() => setFieldUpdated())
      newCounterArgumentForm.value = false
    }

    const createArgumentType = async (
      endpoint: string,
      projectProperty: (IArgument | ICounterArgument)[],
      formData: IArgument | ICounterArgument
    ) => {
      if (project.value) {
        const payload = {
          ...formData.value,
          project: project.value['@id'],
        }
        return await createProjectEntity<IArgument | ICounterArgument>(
          endpoint,
          projectProperty,
          payload
        ).then((res) => {
          formKey.value++
          newArgumentForm.value = false
          setFieldUpdated()
          return res
        })
      }
    }

    const updateEntity = async (
      endpoint: string,
      data: IProposal | IArgument | ICounterArgument,
      id: string | number
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
          setFieldUpdated()
        })
      }
    }

    const deleteEntity = async (
      endpoint: string,
      id: number | string,
      projectProperty: IArgument | ICounterArgument
    ) => {
      // @ts-ignore
      await deleteProjectEntity<IArgument | ICounterArgument>(
        endpoint,
        id,
        projectProperty
      ).then(() => {
        setFieldUpdated()
      })
    }

    const updatePriority = async (
      entity: ICounterArgument | IArgument,
      endpoint: string
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
      await Promise.all(allAsyncResults).then((res) => {
        store.commit('projects/SET_PROJECT_PROPERTY', [
          camelCase(endpoint),
          res.map((e) => e.data),
        ])
        setFieldUpdated()
      })
    }

    // @ts-ignore
    const deleteNegation = async (id) => {
      // @ts-ignore
      await context.$api.negations.delete(id).then(() => setFieldUpdated())
    }

    const createOrUpdateNegations = async (
      id: string,
      counterArgumentIndex: number,
      counterArgument: ICounterArgument,
      negationIndex: number,
      value: string
    ) => {
      const payload = {
        description: value,
        counterArgument: counterArgument['@id'],
      }
      if (id) {
        // @ts-ignore
        await context.$api.negations
          .update(id, payload)
          .then((res) => {
            store.commit('projects/SET_PROJECT_PROPERTY', [
              `counterArguments[${counterArgumentIndex}].negations[${negationIndex}]`,
              res.data,
            ])
          })
          .then(() => setFieldUpdated())
      } else {
        // @ts-ignore
        await context.$api.negations
          .create(payload)
          .then((res) => {
            counterArguments.value[counterArgumentIndex].negations.push(
              res.data
            )
            const data = counterArguments.value[counterArgumentIndex].negations
            store.commit('projects/SET_PROJECT_PROPERTY', [
              `counterArguments[${counterArgumentIndex}].negations`,
              data,
            ])
          })
          .then(() => setFieldUpdated())
      }
    }

    const newArgumentForm = ref(false)
    const newCounterArgumentForm = ref(false)
    const newNegationForm = ref(false)

    const openForm = (form: string) => {
      if (form === 'newArgumentForm') {
        setLockedField('arguments')
        newArgumentForm.value = true
      }
      if (form === 'newCounterArgumentForm') {
        setLockedField('counter_arguments')
        newCounterArgumentForm.value = true
      }
      if (form === 'newNegationForm') {
        setLockedField('counter_arguments')
        newNegationForm.value = true
      }
    }

    const closeForm = (form: string) => {
      if (form === 'newArgumentForm') {
        resetLockedField()
        newArgumentForm.value = false
      }
      if (form === 'newCounterArgumentForm') {
        resetLockedField()
        newCounterArgumentForm.value = false
      }
      if (form === 'newNegationForm') {
        resetLockedField()
        newNegationForm.value = false
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
      newArgumentForm,
      newCounterArgumentForm,
      newNegationForm,
      recentProjectSaved,
      projectSaved,
      setLockedField,
      fieldIsLocked,
      setLockedFieldText,
      resetLockedField,
      setFieldUpdated,
      openForm,
      closeForm,
      counterArgumentDescriptions,
      argumentDescription,
    }
  },
})
</script>
