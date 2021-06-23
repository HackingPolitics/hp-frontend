<template>
  <FormulateForm>
    <forms-layout title="Strategie" no-actions>
      <div class="space-y-4">
        <forms-form-section v-for="partner in partners" :key="partner.id">
          <h3 class="text-lg leading-6 text-gray-900 mb-8">
            Möglicher Strategischer Partner:
            <span class="font-semibold">{{ partner.name }}</span>
          </h3>
          <FormulateForm
            v-model="partnerFormData[partner.id]"
            @submit="updatePartner(partner.id)"
          >
            <div class="flex flex-wrap justify-end">
              <FormulateInput
                outer-class="w-1/2 pr-4 pb-4"
                type="text"
                :value="partner.name"
                name="name"
                validation="required"
                label="Name"
              />
              <FormulateInput
                outer-class="w-1/2 pr-4 pb-4"
                type="text"
                :value="partner.contactName"
                name="contactName"
                label="Ansprechpartner"
              />
              <FormulateInput
                outer-class="w-1/2 pr-4 pb-4"
                type="text"
                :value="partner.contactEmail"
                name="contactEmail"
                label="Email"
              />
              <FormulateInput
                outer-class="w-1/2 pr-4 pb-4"
                type="text"
                :value="partner.contactPhone"
                name="contactPhone"
                label="Telefonnummer"
              />
              <FormulateInput
                outer-class="py-4"
                type="button"
                @click="deletePartner(partner.id)"
              >
                <outline-trash-icon class="h-5 w-5"></outline-trash-icon>
              </FormulateInput>
              <FormulateInput
                outer-class="py-4 ml-4"
                type="submit"
                label="Speichern"
              >
                <outline-check-circle-icon
                  class="h-5 w-5"
                ></outline-check-circle-icon>
              </FormulateInput>
            </div>
          </FormulateForm>
        </forms-form-section>
        <forms-form-section>
          <FormulateForm
            v-model="createPartnerFormData"
            @submit="createPartner()"
          >
            <div class="flex flex-wrap justify-between">
              <FormulateInput
                outer-class="w-1/2 pr-4 pb-4"
                type="text"
                name="name"
                validation="required"
                label="Name"
              />
              <FormulateInput
                outer-class="w-1/2 pr-4 pb-4"
                type="text"
                name="contactName"
                label="Ansprechpartner"
                :validation="'not:' + createPartnerFormData.name"
              />
              <FormulateInput
                outer-class="w-1/2 pr-4 pb-4"
                type="text"
                name="contactEmail"
                label="Email"
              />
              <FormulateInput
                outer-class="w-1/2 pr-4 pb-4"
                type="text"
                name="contactPhone"
                label="Telefonnummer"
              />
              <FormulateInput
                outer-class="w-full py-4"
                type="submit"
                label="+ Partner hinzufügen"
              />
            </div>
          </FormulateForm>
        </forms-form-section>
      </div>
    </forms-layout>
  </FormulateForm>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from '@nuxtjs/composition-api'
import { cloneDeep } from 'lodash'
import editApplication from '~/composables/editApplication'
import { IPartner } from '~/types/apiSchema'

interface CreatePartnerForm {
  contactEmail?: string
  contactName?: string
  contactPhone?: string
  name: string
  teamContact?: string
}

interface PartnerArguments extends CreatePartnerForm {
  project: string
}

interface PartnerForm {
  [name: string]: CreatePartnerForm
}

export default defineComponent({
  name: 'Strategy',
  setup() {
    const partnerFormData = ref<PartnerForm>({})
    const createPartnerFormData = ref<CreatePartnerForm>({ name: '' })
    const partners = ref([])

    const {
      createProjectEntity,
      deleteProjectEntity,
      updateProjectEntity,
      project,
    } = editApplication()

    onMounted(() => {
      if (project.value?.partners)
        partners.value = cloneDeep(project.value.partners)
    })

    watch(
      project,
      (currentValue) => {
        partners.value = cloneDeep(currentValue?.partners || [])
      },
      {
        deep: true,
      }
    )

    const createPartner = async () => {
      if (project.value && typeof project.value['@id'] === 'string') {
        const payload: IPartner = {
          ...createPartnerFormData.value,
          project: project.value['@id'],
        }
        await createProjectEntity<IPartner>(
          'partners',
          partners.value,
          payload
        ).then(() => (createPartnerFormData.value = { name: '' }))
      }
    }

    const deletePartner = async (id: string | number) => {
      await deleteProjectEntity('partners', id, partners.value)
    }

    const updatePartner = async (id: string | number) => {
      if (project.value && typeof project.value['@id'] === 'string') {
        const payload: PartnerArguments = {
          ...partnerFormData.value[id],
          project: project.value['@id'],
        }
        await updateProjectEntity<IPartner>('partners', id, payload)
      }
    }
    return {
      partnerFormData,
      createPartnerFormData,
      partners,
      createPartner,
      deletePartner,
      updatePartner,
    }
  },
})
</script>
