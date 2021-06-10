<template>
  <FormulateForm>
    <forms-layout :title="$t('forms.arguments.title')" no-actions>
      <div>
        <div class="grid grid-cols-2 gap-6">
          <forms-form-section
            :title="$t('forms.arguments.question')"
            class="col-span-1"
          >
            <transition-group tag="ul" type="transition" name="flip-list">
              <li
                v-for="argumentation in argumentations"
                :key="argumentation.id"
                class="inline-flex w-full justify-center"
              >
                <FormulateInput
                  :value="argumentation.description"
                  name="description"
                  type="textarea"
                  rows="3"
                  element-class="inline-flex w-full"
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
                >
                </FormulateInput>
                <FormulateInput
                  input-class="ml-4 form-button"
                  type="button"
                  @click="
                    deleteEntity('arguments', argumentation.id, argumentations)
                  "
                  ><outline-trash-icon class="h-4 w-4"
                /></FormulateInput>
              </li>
            </transition-group>

            <FormulateForm
              v-model="formData.createArgument"
              @submit="
                createEntity('arguments', 'createArgument', argumentations)
              "
            >
              <div class="inline-flex w-full justify-between">
                <FormulateInput
                  type="text"
                  name="description"
                  validation="required"
                  :validation-name="$t('validation.name.arguments.description')"
                  :key="formKey"
                />
                <FormulateInput input-class="ml-4 form-button" type="submit"
                  ><outline-plus-icon class="h-5 w-5"
                /></FormulateInput>
              </div>
            </FormulateForm>
          </forms-form-section>

          <forms-form-section
            :title="$t('forms.counter_arguments.question')"
            class="col-span-1"
          >
            <draggable
              :list="counterArguments"
              :sort="true"
              ghost-class="ghost"
            >
              <transition-group tag="ul" type="transition" name="flip-list">
                <li
                  v-for="counterArgument in counterArguments"
                  :key="counterArgument.id"
                  class="inline-flex w-full justify-center cursor-move"
                >
                  <FormulateInput
                    :value="counterArgument.description"
                    name="description"
                    type="textarea"
                    rows="3"
                    input-class="w-full form-input"
                    element-class="inline-flex w-full"
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
                  </FormulateInput>
                  <FormulateInput
                    input-class="ml-4 form-button"
                    type="button"
                    @click="
                      deleteEntity(
                        'counter_arguments',
                        counterArgument.id,
                        counterArguments
                      )
                    "
                    ><outline-trash-icon class="h-5 w-5"
                  /></FormulateInput>
                </li>
              </transition-group>
            </draggable>

            <FormulateForm
              v-model="formData.createCounterArgument"
              @submit="
                createEntity(
                  'counter_arguments',
                  'createCounterArgument',
                  counterArguments
                )
              "
            >
              <div class="inline-flex w-full justify-between">
                <FormulateInput
                  type="text"
                  name="description"
                  validation="required"
                  :validation-name="
                    $t('validation.name.counter_arguments.description')
                  "
                  :key="formKey"
                />
                <FormulateInput input-class="ml-4 form-button" type="submit"
                  ><outline-plus-icon class="h-5 w-5" />
                </FormulateInput>
              </div>
            </FormulateForm>
          </forms-form-section>
        </div>

        <div>
          <h2 class="text-3xl font-extrabold text-blue-gray-900 mb-4">
            {{ $t('forms.proposals.title') }}
          </h2>
          <forms-form-section
            v-for="proposal in proposals"
            :key="proposal.id"
            title="Vorschläge"
          >
            <h3 class="text-lg leading-6 text-gray-900 mb-8">
              Vorschlag:
              <span class="font-semibold">{{ proposal.title }}</span>
            </h3>
            <FormulateForm
              v-model="proposalsFormData[proposal.id]"
              @submit="
                updateEntity(
                  'proposals',
                  ...proposalsFormData[proposal.id],
                  proposal.id
                )
              "
            >
              <div class="grid grid-cols-4 gap-4">
                <FormulateInput
                  outer-class="col-span-2"
                  type="text"
                  :value="proposal.title"
                  name="title"
                  validation="required"
                  :label="$t('title')"
                />
                <FormulateInput
                  outer-class="col-span-2"
                  type="text"
                  :value="proposal.introduction"
                  name="contactName"
                  :label="$t('introduction')"
                />
                <FormulateInput
                  outer-class="col-span-2"
                  type="text"
                  :value="proposal.reasoning"
                  name="reasoning"
                  :label="$t('reasoning')"
                />
                <FormulateInput
                  outer-class="col-span-2"
                  type="text"
                  :value="proposal.sponsor"
                  name="reasoning"
                  validation="required"
                  :label="$t('sponsor')"
                />
                <FormulateInput
                  outer-class="col-span-2"
                  type="text"
                  :value="proposal.actionMandate"
                  name="actionMandate"
                  :label="$t('actionMandate')"
                />
                <FormulateInput
                  outer-class="col-span-2"
                  type="text"
                  :value="proposal.comment"
                  name="url"
                  :label="$t('url')"
                />
                <FormulateInput
                  outer-class="col-span-4"
                  type="textarea"
                  :value="proposal.comment"
                  rows="3"
                  name="comment"
                  :label="$t('comment')"
                />
                <div class="col-span-4">
                  <div class="flex justify-end items-center">
                    <FormulateInput
                      outer-class="pr-4"
                      type="button"
                      @click="deletePartner(proposal.id)"
                    >
                      <outline-trash-icon class="h-5 w-5"></outline-trash-icon>
                    </FormulateInput>
                    <FormulateInput
                      outer-class=""
                      type="submit"
                      :label="$t('save')"
                    >
                      <outline-check-circle-icon
                        class="h-5 w-5"
                      ></outline-check-circle-icon>
                    </FormulateInput>
                  </div>
                </div>
              </div>
            </FormulateForm>
          </forms-form-section>
          <forms-form-section>
            <FormulateForm
              v-model="formData.createProposal"
              @submit="createEntity('proposals', 'createProposal', proposals)"
            >
              <div class="grid grid-cols-4 gap-4">
                <FormulateInput
                  outer-class="col-span-2"
                  type="text"
                  name="title"
                  validation="required"
                  :label="$t('title')"
                />
                <FormulateInput
                  outer-class="col-span-2"
                  type="text"
                  name="contactName"
                  :label="$t('introduction')"
                />
                <FormulateInput
                  outer-class="col-span-2"
                  type="text"
                  name="reasoning"
                  :label="$t('reasoning')"
                />
                <FormulateInput
                  outer-class="col-span-2"
                  type="text"
                  name="sponsor"
                  :label="$t('sponsor')"
                />
                <FormulateInput
                  outer-class="col-span-2"
                  type="text"
                  name="actionMandate"
                  :label="$t('actionMandate')"
                />
                <FormulateInput
                  outer-class="col-span-2"
                  type="text"
                  name="url"
                  :label="$t('url')"
                />
                <FormulateInput
                  outer-class="col-span-4"
                  type="textarea"
                  rows="3"
                  name="comment"
                  :label="$t('comment')"
                />

                <FormulateInput
                  outer-class="col-span-4"
                  type="submit"
                  :label="$t('forms.proposals.add')"
                />
              </div>
            </FormulateForm>
          </forms-form-section>
        </div>
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
  createProposal: IProposal
}

interface ProposalsForm {
  [name: string]: CreateForm
}

export default defineComponent({
  name: 'Arguments',
  setup() {
    const argumentations = ref<IArgument[]>([])
    const counterArguments = ref<ICounterArgument[]>([])
    const proposals = ref<IProposal[]>([])
    const proposalsFormData = ref<ProposalsForm>({})

    const formData = ref<CreateForm>({
      createArgument: { description: '' },
      createCounterArgument: { description: '' },
      createProposal: {},
    })

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
      if (project.value?.counterArguments)
        proposals.value = cloneDeep(project.value.proposals)
    })

    watch(
      project,
      (currentValue) => {
        argumentations.value = cloneDeep(currentValue?.arguments || [])
        counterArguments.value = cloneDeep(currentValue?.counterArguments || [])
        proposals.value = cloneDeep(currentValue?.proposals || [])
      },
      { deep: true }
    )

    const validationArguments = ref<IValidation>({ hasErrors: false })
    const validationCounterArguments = ref<IValidation>({ hasErrors: false })

    const createEntity = async (
      endpoint: string,
      FormDataKey: keyof CreateForm,
      projectProperty: (IArgument | ICounterArgument)[]
    ) => {
      if (project.value) {
        const payload = {
          ...formData.value[FormDataKey],
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
      if (project.value && typeof project.value['@id'] === 'string') {
        const payload: IProposal | IArgument | ICounterArgument = {
          ...data,
          project: project.value['@id'],
        }
        await updateE<IArgument | IProposal | ICounterArgument>(
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
      await deleteE<IArgument | ICounterArgument>(endpoint, id, projectProperty)
    }

    return {
      argumentations,
      counterArguments,
      proposalsFormData,
      proposals,
      formData,
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
