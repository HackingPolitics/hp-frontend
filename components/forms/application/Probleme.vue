<template>
  <FormulateForm v-model="formData">
    <forms-layout title="Probleme Handlungsfelder">
      <div class="space-y-6">
        <FormSection title="Probleme">
          <FormulateInput
            type="group"
            :repeatable="true"
            name="problems"
            label="Welche Probleme hast du beobachtet und möchtest es anlegen"
            add-label="+ Problem hinzufügen"
            remove-label="Entfernen"
          >
            <FormulateInput name="problem" type="text" />
          </FormulateInput>
        </FormSection>
        <FormSection
          title="Handlungsauftrag"
          subtitle="Was sollte die Stadtverwaltung tun, um das Problem anzugehen"
        >
          <FormulateInput
            type="group"
            :repeatable="true"
            name="problems"
            label="Der Stadtrat beauftrag den Oberbügermeister"
            add-label="+ Maßnahme hinzufügen"
          >
            <FormulateInput name="problem" type="text" />
          </FormulateInput>
        </FormSection>
      </div>
      <template #actions>
        <div class="flex justify-end">
          <button
            type="button"
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
          >
            Zurück
          </button>
          <button
            type="submit"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-light-blue-500 hover:bg-light-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500"
          >
            Speichern
          </button>
        </div>
      </template>
    </forms-layout>
  </FormulateForm>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Problem',
  setup() {
    const formData = ref(null)

    return {
      formData,
    }
  },
})
</script>
