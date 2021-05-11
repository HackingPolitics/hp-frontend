<template>
  <FormulateForm v-model="formData">
    <forms-layout title="Thema">
      <div class="space-y-4">
        <forms-section
          title="Was ist das Thema, mit dem sich euer Auftrag beschäftigt"
          subtitle="Help"
        >
          <FormulateInput type="textarea" rows="5" name="theme_description">
          </FormulateInput>
        </forms-section>

        <forms-section
          title="Was ist das Thema, mit dem sich euer Auftrag beschäftigt"
          subtitle="Help"
        >
          <FormulateInput
            type="select"
            name="theme_category"
            label="In welche Kategorie passt euer Thema"
          >
          </FormulateInput>
          <FormulateInput type="select"> </FormulateInput>
        </forms-section>
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

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ApplicationFormTheme',
  setup() {
    const formData = ref({})
    return { formData }
  },
})
</script>
