<template>
  <FormulateForm>
    <forms-layout :title="$t('forms.arguments.title')" no-actions>
      <div>
        <!-- Counter Arguments -->
        <forms-form-section
          :title="$t('forms.counter_arguments.question')"
          :subtitle="$t('forms.counter_arguments.help')"
        >
          <draggable
            :list="counterArguments"
            :sort="true"
            ghost-class="ghost"
            handle=".handle"
            @update="updatePriority(counterArguments, 'counter_arguments')"
          >
            <transition-group tag="ul" type="transition" name="flip-list">
              <li
                v-for="counterArgument in counterArguments"
                :key="counterArgument.id"
                class="flex flex-col w-full justify-center items-center mb-8"
              >
                <FormulateForm class="w-full">
                  <FormulateInput
                    :value="counterArgument.description"
                    name="description"
                    type="text"
                    :placeholder="
                      $t('forms.counter_arguments.placeholder.description')
                    "
                    :validation-name="
                      $t('validation.name.counter_arguments.description')
                    "
                    element-class="inline-flex w-full  items-center"
                    input-class="list-input-text"
                    outer-class="list-input-outer"
                    validation="required"
                    @validation="validationCounterArguments = $event"
                    @focusout="
                      !validationCounterArguments.hasErrors
                        ? updateEntity(
                            'counter_arguments',
                            { description: $event.target.value },
                            counterArgument.id
                          )
                        : {}
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
                          class="w-5 h-5"
                        ></outline-menu-alt-4-icon>
                        <outline-thumb-down-icon
                          class="w-5 h-5 text-red-500"
                        ></outline-thumb-down-icon>
                        <span class="text-red-500">{{
                          $t('forms.counter_arguments.cons')
                        }}</span>
                      </div>
                    </template>
                    <template #suffix>
                      <FormulateInput
                        input-class="flex items-center ml-4"
                        type="button"
                        @click="
                          deleteEntity(
                            'counter_arguments',
                            counterArgument.id,
                            counterArguments
                          )
                        "
                        ><solid-x-icon class="h-5 w-5"
                      /></FormulateInput>
                    </template>
                  </FormulateInput>
                  <FormulateInput
                    type="group"
                    remove-position="after"
                    name="negations"
                    :repeatable="true"
                    minimum="1"
                    add-label="Konter-Argument hinzufügen"
                    :value="counterArgument.negations"
                  >
                    <template #addmore="{ addMore }">
                      <FormulateInput
                        input-class="flex space-x-2 items-center mt-4 text-purple-500"
                        type="button"
                        @click="addMore()"
                      >
                        <outline-plus-icon class="w-6 h-6"></outline-plus-icon>
                        <span class="">{{
                          $t('forms.counter_arguments.add_counter')
                        }}</span>
                      </FormulateInput>
                    </template>
                    <FormulateInput
                      name="description"
                      type="text"
                      :validation-name="
                        $t('validation.name.arguments.negations')
                      "
                      element-class="inline-flex w-full items-center"
                      input-class="border-0 w-full"
                      :placeholder="
                        $t('forms.counter_arguments.placeholder.negations')
                      "
                      validation="required"
                    >
                      <template #prefix>
                        <div class="inline-flex items-center space-x-2 px-4">
                          <outline-chat-alt-2-icon
                            class="w-5 h-5"
                          ></outline-chat-alt-2-icon>
                        </div>
                      </template>
                    </FormulateInput>
                  </FormulateInput>
                </FormulateForm>
              </li>
            </transition-group>
          </draggable>
          <div class="border-t-2 pt-6">
            <forms-application-create-counter-arguments
              :form-key="formKey"
              @submit="createCounterArguments($event)"
            >
            </forms-application-create-counter-arguments>
          </div>
        </forms-form-section>

        <!-- Arguments -->
        <forms-form-section :title="$t('forms.arguments.question')">
          <draggable
            :list="argumentations"
            :sort="true"
            ghost-class="ghost"
            handle=".handle"
            @update="updatePriority(argumentations, 'arguments')"
          >
            <transition-group tag="ul" type="transition" name="flip-list">
              <li
                v-for="argumentation in argumentations"
                :key="argumentation.id"
                class="flex flex-col w-full justify-center items-center mb-8"
              >
                <FormulateInput
                  :value="argumentation.description"
                  name="description"
                  type="text"
                  :validation-name="$t('validation.name.arguments.description')"
                  element-class="inline-flex w-full  items-center"
                  input-class="list-input-text"
                  outer-class="list-input-outer"
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
                      <outline-thumb-up-icon
                        class="w-5 h-5 text-green-500"
                      ></outline-thumb-up-icon>
                      <span class="text-green-500"> Pro </span>
                    </div>
                  </template>
                  <template #suffix>
                    <FormulateInput
                      input-class="flex items-center ml-4"
                      type="button"
                      @click="
                        deleteEntity(
                          'arguments',
                          argumentation.id,
                          argumentations
                        )
                      "
                      ><solid-x-icon class="h-5 w-5"
                    /></FormulateInput>
                  </template>
                </FormulateInput>
                <FormulateInput
                  type="group"
                  remove-position="after"
                  :repeatable="true"
                  minimum="1"
                  outer-class="w-full"
                  add-label="Quelle hinzufügen"
                >
                  <template #addmore="{ addMore }">
                    <FormulateInput
                      input-class="flex space-x-2 items-center mt-4 text-purple-500"
                      type="button"
                      @click="addMore()"
                    >
                      <outline-plus-icon class="w-6 h-6"></outline-plus-icon>
                      <span class="">{{
                        $t('forms.arguments.add_inspiration_source')
                      }}</span>
                    </FormulateInput>
                  </template>
                  <FormulateInput
                    :value="argumentation.description"
                    name="description"
                    type="text"
                    :validation-name="
                      $t('validation.name.arguments.description')
                    "
                    element-class="inline-flex w-full items-center"
                    input-class="border-0 w-full"
                    outer-class="w-full"
                  >
                    <template #prefix>
                      <div class="inline-flex items-center space-x-2 px-4">
                        <outline-link-icon class="w-5 h-5"></outline-link-icon>
                      </div>
                    </template>
                  </FormulateInput>
                </FormulateInput>
              </li>
            </transition-group>
          </draggable>

          <div class="border-t-2 pt-6">
            <forms-application-create-arguments
              :form-key="formKey"
              @submit="createArgumentType('arguments', $event, argumentations)"
            >
            </forms-application-create-arguments>
          </div>
        </forms-form-section>
      </div>
    </forms-layout>
  </FormulateForm>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  watch,
  useStore,
  useContext,
} from '@nuxtjs/composition-api'

import { camelCase, cloneDeep } from 'lodash'

import {
  IArgument,
  ICounterArgument,
  INegations,
  IProposal,
} from '~/types/apiSchema'
import editApplication from '~/composables/editApplication'
import { IValidation } from '~/types/vueFormulate'
import { RootState } from '~/store'

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

    const {
      createProjectEntity,
      deleteProjectEntity,
      updateProjectEntity,
      project,
    } = editApplication()

    onMounted(() => {
      if (project.value?.arguments) {
        argumentations.value = cloneDeep(project.value.arguments)
        argumentations.value.sort((a, b) => b.priority - a.priority)
      }
      if (project.value?.counterArguments) {
        counterArguments.value = cloneDeep(project.value.counterArguments)
        counterArguments.value.sort((a, b) => b.priority - a.priority)
      }
    })

    watch(
      project,
      (currentValue) => {
        argumentations.value = cloneDeep(currentValue?.arguments || [])
        argumentations.value.sort((a, b) => b.priority - a.priority)
        counterArguments.value = cloneDeep(currentValue?.counterArguments || [])
        counterArguments.value.sort((a, b) => b.priority - a.priority)
      },
      { deep: true }
    )

    const validationArguments = ref<IValidation>({ hasErrors: false })
    const validationCounterArguments = ref<IValidation>({ hasErrors: false })

    const createCounterArguments = async (
      formData: IArgument | ICounterArgument
    ) => {
      await createArgumentType(
        'counter_arguments',
        counterArguments.value,
        formData
      ).then(async (res) => {
        const createdCounterArgument = res?.data
        await Promise.all(
          formData.value.negations.map(async (negation: INegations) => {
            const payload = {
              description: negation.description,
              counterArgument: createdCounterArgument['@id'],
            }
            await createProjectEntity<INegations>(
              'negations',
              counterArguments.value,
              payload
            )
          })
        )
      })
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
        )
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
      )
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
        const asyncResult: any = await context.$api[endpoint]
          .update(entity[index].id, payload)
          .then()
          .catch()
          .finally()
        allAsyncResults.push(asyncResult)
      }
      await Promise.all(allAsyncResults).then((res) => {
        store.dispatch('projects/updateProjectProperty', [
          camelCase(endpoint),
          res.map((e) => e.data),
        ])
      })
    }

    return {
      argumentations,
      counterArguments,
      formKey,
      validationArguments,
      validationCounterArguments,
      createArgumentType,
      updateEntity,
      deleteEntity,
      updatePriority,
      createCounterArguments,
    }
  },
})
</script>
