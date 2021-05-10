<template>
  <FormulateForm>
    <forms-layout title="Antrag schreiben" no-actions>
      <h2 class="text-gray-400">Heute, von Max</h2>
      <forms-section class="relative">
        <button class="absolute -left-16 top-1/2">
          <outline-pencil-icon class="w-6 h-6"></outline-pencil-icon>
        </button>
        <FormulateInput
          type="text"
          rows="3"
          input-class="border-l-4 border-0 w-full"
          label-class="font-bold pb-4 flex"
          label="Gegenstand"
          value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
        >
        </FormulateInput>
      </forms-section>
      <forms-section class="relative">
        <button class="absolute -left-16 top-1/2">
          <outline-pencil-icon class="w-6 h-6"></outline-pencil-icon>
        </button>
        <FormulateInput
          type="textarea"
          input-class="border-l-4 border-0 w-full"
          label-class="font-bold pb-4 flex"
          rows="3"
          label="Beschlussvorschlag"
        >
        </FormulateInput>
      </forms-section>
      <forms-section class="relative">
        <button class="absolute -left-16 top-1/2">
          <outline-pencil-icon class="w-6 h-6"></outline-pencil-icon>
        </button>
        <FormulateInput
          type="textarea"
          rows="3"
          label="Bezeichnung Handlungsauftrag"
          label-class="font-bold pb-4 flex"
          input-class="border-l-4 border-0 w-full"
        >
        </FormulateInput>
      </forms-section>
    </forms-layout>
  </FormulateForm>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ApplicationFormWriting',
  setup(){

  }
})
</script>
