<template>
  <FormulateForm>
    <div class="space-y-4 relative">
      <forms-form-section
        v-for="partner in partners"
        :key="partner.id"
        :locked="fieldIsLocked('strategy_' + partner.id)"
        :locked-text="setLockedFieldText(`strategy_${partner.id}`)"
      >
        <h3 class="text-lg leading-6 text-gray-900 mb-8">
          {{ $t('forms.strategy.possiblePartners') }}:
          <span class="font-semibold">{{ partner.name }}</span>
        </h3>
        <forms-project-partner :partner="partner" :partners="partners" />
      </forms-form-section>
      <forms-form-section
        :locked="fieldIsLocked('strategy')"
        :locked-text="setLockedFieldText('strategy')"
      >
        <FormulateForm
          :key="formKey"
          v-model="createPartnerFormData"
          @submit="createPartner()"
        >
          <div class="flex flex-wrap justify-between">
            <FormulateInput
              outer-class="w-1/2 pr-4 pb-4"
              type="text"
              name="name"
              validation="required"
              label="Name der Organisation"
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
  </FormulateForm>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
import { cloneDeep } from 'lodash'
import editApplication from '~/composables/editApplication'
import { IPartner } from '~/types/apiSchema'
import collaborations from '~/composables/collaborations'

interface CreatePartnerForm {
  contactEmail?: string
  contactName?: string
  contactPhone?: string
  name: string
  teamContact?: string
}

export default defineComponent({
  name: 'Strategy',
  setup() {
    const createPartnerFormData = ref<CreatePartnerForm>({ name: '' })
    const partners = ref([])

    const formKey = ref(1)

    const { createProjectEntity, project } = editApplication()

    const {
      setLockedField,
      fieldIsLocked,
      setLockedFieldText,
      setFieldUpdated,
    } = collaborations()

    watch(
      project,
      (currentValue) => {
        partners.value = cloneDeep(currentValue?.partners || [])
      },
      {
        deep: true,
        immediate: true,
      }
    )

    const createPartner = async () => {
      if (project.value && typeof project.value['@id'] === 'string') {
        const payload: IPartner = {
          ...createPartnerFormData.value,
          project: project.value['@id'],
        }
        await createProjectEntity<IPartner>('partners', payload).then(() => {
          formKey.value++
          setFieldUpdated()
        })
      }
    }

    return {
      createPartnerFormData,
      partners,
      formKey,
      createPartner,
      fieldIsLocked,
      setLockedField,
      setLockedFieldText,
    }
  },
})
</script>
