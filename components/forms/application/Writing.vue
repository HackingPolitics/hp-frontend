<template>
  <FormulateForm>
    <forms-layout title="Antrag schreiben" no-actions>
      <h2 class="text-gray-400">Heute, von Max</h2>
      <forms-section class="relative">
        <div
          v-if="checkInputEnabled('gegenstand')"
          class="absolute -left-16 top-1/2"
        >
          <span
            class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-300"
            @click="disableInput('gegenstand')"
          >
            <span class="text-sm font-medium leading-none text-white">TW</span>
          </span>
        </div>
        <button
          v-else
          class="absolute -left-16 top-1/2"
          @click="enableInput('gegenstand')"
        >
          <outline-pencil-icon class="w-6 h-6"></outline-pencil-icon>
        </button>

        <FormulateInput
          type="text"
          rows="3"
          :input-class="`border-l-4 border-0 w-full ' +
            ${checkInputEnabled('gegenstand') ? 'border-blue-300' : ''}`"
          label-class="font-bold pb-4 flex"
          label="Gegenst  and"
          :disabled="
            !enabledInputs.find((input) => {
              return input === 'gegenstand'
            })
          "
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
          rows="4"
          label="Beschlussvorschlag"
          value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"
        >
        </FormulateInput>
      </forms-section>
      <forms-section class="relative">
        <button class="absolute -left-16 top-1/2">
          <outline-pencil-icon class="w-6 h-6"></outline-pencil-icon>
        </button>
        <FormulateInput
          type="textarea"
          rows="4"
          label="Bezeichnung Handlungsauftrag"
          label-class="font-bold pb-4 flex"
          input-class="border-l-4 border-0 w-full"
          value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        >
        </FormulateInput>
      </forms-section>
    </forms-layout>
  </FormulateForm>
</template>

<script lang="ts">
import { defineComponent, ref, computed, Ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ApplicationFormWriting',
  setup() {
    const enabledInputs: Ref<string[]> = ref([])
    function enableInput(name: string): void {
      enabledInputs.value.push(name)
    }
    function checkInputEnabled(name: string): any {
      return enabledInputs.value.find((input) => {
        return input === name
      })
    }
    function disableInput(name: string): void {
      enabledInputs.value.splice(enabledInputs.value.indexOf(name), 1)
    }
    return { enabledInputs, enableInput, checkInputEnabled, disableInput }
  },
})
</script>
