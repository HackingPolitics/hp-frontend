<template>
  <FormulateForm>
    <forms-layout title="Thema">
      <div class="space-y-6">
        <FormulateInput type="textarea" rows="3" label="Was ist das Thema">
        </FormulateInput>

        <FormulateInput
          type="select"
          label="In welche Kategorie passt euer Thema"
        >
        </FormulateInput>
        <FormulateInput type="select"> </FormulateInput>
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
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Thema',
})
</script>
