<template>
  <FormulateForm>
    <forms-layout :title="$t('forms.arguments.title')" no-actions>
      <div>
        <forms-form-section
          :title="$t('forms.counter_arguments.question')"
          :subtitle="$t('forms.counter_arguments.help')"
        >
          <draggable
            :list="counterArguments"
            :sort="true"
            ghost-class="ghost"
            handle=".handle"
          >
            <transition-group tag="ul" type="transition" name="flip-list">
              <li
                v-for="counterArgument in counterArguments"
                :key="counterArgument.id"
                class="flex flex-col w-full justify-center items-center mb-8"
              >
                <FormulateInput
                  :value="counterArgument.description"
                  name="description"
                  type="text"
                  :placeholder="
                    $t('forms.counter_arguments.placeholder.description')
                  "
                  :validation-name="$t('validation.name.arguments.description')"
                  element-class="inline-flex w-full  items-center"
                  input-class="border-0 focus:ring-0 focus:border-purple-500 border-l-2 border-gray-300 bg-gray-200 w-full"
                  outer-class="p-2 bg-gray-200 w-full mb-4"
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
                          'arguments',
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
                  :repeatable="true"
                  minimum="1"
                  add-label="Konter-Argument hinzufügen"
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
                    :value="counterArgument.description"
                    name="description"
                    type="text"
                    :validation-name="
                      $t('validation.name.arguments.description')
                    "
                    element-class="inline-flex w-full items-center"
                    input-class="border-0 w-full"
                    outer-class="w-full"
                    :placeholder="
                      $t('forms.counter_arguments.placeholder.counter')
                    "
                    validation="required"
                    @validation="validationArguments = $event"
                    @focusout="
                      !validationArguments.hasErrors
                        ? updateEntity(
                            'counter_arguments',
                            { description: $event.target.value },
                            counterArgument.id
                          )
                        : {}
                    "
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
              </li>
            </transition-group>
          </draggable>
          <div class="border-t-2 pt-6">
            <forms-application-create-counter-arguments
              @submit="
                createEntity('counter_arguments', $event, counterArguments)
              "
            >
            </forms-application-create-counter-arguments>
          </div>
        </forms-form-section>

        <forms-form-section :title="$t('forms.arguments.question')">
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
                input-class="border-0 border-l-2 border-gray-300 bg-gray-200 w-full"
                outer-class="p-2 bg-gray-200 w-full mb-4"
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
                  <div class="inline-flex items-center space-x-2 pr-4">
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
                    <span class="">{{ $t('forms.arguments.add_source') }}</span>
                  </FormulateInput>
                </template>
                <FormulateInput
                  :value="argumentation.description"
                  name="description"
                  type="text"
                  :validation-name="$t('validation.name.arguments.description')"
                  element-class="inline-flex w-full items-center"
                  input-class="border-0 w-full"
                  outer-class="w-full"
                  validation="required"
                  @validation="validationArguments = $event"
                  @focusout="
                    !validationArguments.hasErrors
                      ? updateEntity(
                          'counter_arguments',
                          { description: $event.target.value },
                          argumentation.id
                        )
                      : {}
                  "
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

          <FormulateInput type="button"
            ><outline-thumb-up-icon class="h-5 w-5 text-green-500" />
            <span class="text-green-500 pl-4">{{
              $t('forms.arguments.add')
            }}</span>
          </FormulateInput>
        </forms-form-section>
      </div>
    </forms-layout>
  </FormulateForm>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from '@nuxtjs/composition-api'

import { cloneDeep } from 'lodash'

import { IArgument, ICounterArgument, IProposal } from '~/types/apiSchema'
import editApplication from '~/composables/editApplication'
import { IValidation } from '~/types/vueFormulate'

interface CreateForm {
  createArgument: { description?: string }
  createCounterArgument: { description?: string }
}

export default defineComponent({
  name: 'Arguments',
  setup() {
    const argumentations = ref<IArgument[]>([])
    const counterArguments = ref<ICounterArgument[]>([])

    /*
 workaround for resetting form and validation because
 $formulate plugin is not support for vue 3 now
 */
    const formKey = ref(1)

    const {
      createEntity: createE,
      deleteEntity: deleteE,
      updateEntity: updateE,
      project,
    } = editApplication()

    onMounted(() => {
      if (project.value?.arguments)
        argumentations.value = cloneDeep(project.value.arguments)
      if (project.value?.counterArguments)
        counterArguments.value = cloneDeep(project.value.counterArguments)
    })

    watch(
      project,
      (currentValue) => {
        argumentations.value = cloneDeep(currentValue?.arguments || [])
        counterArguments.value = cloneDeep(currentValue?.counterArguments || [])
      },
      { deep: true }
    )

    const validationArguments = ref<IValidation>({ hasErrors: false })
    const validationCounterArguments = ref<IValidation>({ hasErrors: false })

    const createEntity = async (
      endpoint: string,
      formData: IArgument | ICounterArgument,
      projectProperty: (IArgument | ICounterArgument)[]
    ) => {
      if (project.value) {
        const payload = {
          ...formData.value,
          project: project.value['@id'],
        }
        await createE<IArgument | ICounterArgument>(
          endpoint,
          projectProperty,
          payload
        ).then(() => {
          formKey.value++
        })
      }
    }
    const updateEntity = async (
      endpoint: string,
      data: IProposal | IArgument | ICounterArgument,
      id: string | number
    ) => {
      /* if (project.value && typeof project.value['@id'] === 'string') {
        const payload: IProposal | IArgument | ICounterArgument = {
          ...data,
          project: project.value['@id'],
        }
        await updateE<IArgument | IProposal | ICounterArgument>(
          endpoint,
          id,
          payload
        )
      } */
    }
    const deleteEntity = async (
      endpoint: string,
      id: number | string,
      projectProperty: IArgument | ICounterArgument
    ) => {
      // @ts-ignore
      await deleteE<IArgument | ICounterArgument>(endpoint, id, projectProperty)
    }

    return {
      argumentations,
      counterArguments,
      formKey,
      validationArguments,
      validationCounterArguments,
      createEntity,
      updateEntity,
      deleteEntity,
    }
  },
})
</script>
