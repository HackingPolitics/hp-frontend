<template>
  <FormulateForm
    v-model="partnerFormData[partner.id]"
    :disabled="!editPartnerFormIsOpen"
    @submit="updatePartner(partner.id)"
  >
    <div class="flex flex-wrap">
      <FormulateInput
        outer-class="w-1/2 pr-4 pb-4"
        type="text"
        :value="partner.name"
        name="name"
        validation="required"
        :disabled="!editPartnerFormIsOpen"
        label="Name der Organisation"
      />
      <FormulateInput
        outer-class="w-1/2 pr-4 pb-4"
        type="text"
        :value="partner.contactName"
        :disabled="!editPartnerFormIsOpen"
        name="contactName"
        label="Ansprechpartner"
      />
      <FormulateInput
        outer-class="w-1/2 pr-4 pb-4"
        type="text"
        :value="partner.contactEmail"
        :disabled="!editPartnerFormIsOpen"
        name="contactEmail"
        label="Email"
      />
      <FormulateInput
        outer-class="w-1/2 pr-4 pb-4"
        type="text"
        :value="partner.contactPhone"
        :disabled="!editPartnerFormIsOpen"
        name="contactPhone"
        label="Telefonnummer"
      />
      <FormulateInput
        outer-class="py-4 mr-2"
        type="button"
        @click="deletePartner(partner.id)"
      >
        <outline-trash-icon class="h-5 w-5"></outline-trash-icon>
      </FormulateInput>
      <div v-if="editPartnerFormIsOpen" class="inline-flex">
        <FormulateInput
          outer-class="py-4"
          type="button"
          @click="closeEditPartnerForm"
        >
          Zurück
        </FormulateInput>

        <FormulateInput outer-class="py-4 ml-2" type="submit" label="Speichern">
          Speichern
        </FormulateInput>
      </div>
      <FormulateInput
        v-else
        outer-class="py-4"
        type="button"
        @click="openEditPartnerForm(partner.id)"
      >
        <outline-pencil-icon class="h-5 w-5"></outline-pencil-icon>
      </FormulateInput>
    </div>
  </FormulateForm>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
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

interface PartnerArguments extends CreatePartnerForm {
  project: string
}

interface PartnerForm {
  [name: string]: CreatePartnerForm
}

export default defineComponent({
  name: 'Partner',
  props: {
    partner: {
      type: Object,
      default: null,
    },
    partners: {
      type: Array,
      default: null,
    },
  },

  setup(props) {
    const partnerFormData = ref<PartnerForm>({})

    const { updateProjectEntity, deleteProjectEntity, project } =
      editApplication()

    const { setLockedField, resetLockedField, setFieldUpdated } =
      collaborations()

    const updatePartner = async (id: string | number) => {
      if (project.value && typeof project.value['@id'] === 'string') {
        const payload: PartnerArguments = {
          ...partnerFormData.value[id],
          project: project.value['@id'],
        }
        ;(await updateProjectEntity)<IPartner>('partners', id, payload).then(
          () => {
            setFieldUpdated()
          }
        )
      }
    }

    const deletePartner = async (id: string | number) => {
      await deleteProjectEntity('partners', id, props.partners)
    }

    const editPartnerFormIsOpen = ref(false)

    const openEditPartnerForm = (id: string | number) => {
      setLockedField('strategy_' + id)
      editPartnerFormIsOpen.value = true
    }

    const closeEditPartnerForm = () => {
      resetLockedField()
      editPartnerFormIsOpen.value = false
    }

    return {
      partnerFormData,
      updatePartner,
      deletePartner,
      openEditPartnerForm,
      closeEditPartnerForm,
      editPartnerFormIsOpen,
    }
  },
})
</script>
