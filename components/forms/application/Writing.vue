<template>
  <FormulateForm>
    <forms-layout title="Antrag schreiben" no-actions no-concept-sidebar>
      <template #left-side>
        <transition
          mode="out-in"
          enter-active-class="transition ease-out duration-100"
          enter-class="transform opacity-0"
          enter-to-class="transform opacity-100"
          leave-active-class="transition ease-in duration-75"
          leave-class="transform translate-x-0"
          leave-to-class="transform -translate-x-10 translate-y-0"
        >
          <div v-if="!sidebarOpen" class="flex justify-center">
            <button
              class="focus:outline-none"
              @click="sidebarOpen = !sidebarOpen"
            >
              <outline-puzzle-icon class="w-7 h-7"></outline-puzzle-icon>
            </button>
          </div>
          <ul v-else class="w-96 mt-4">
            <li
              class="col-span-2 flex flex-col bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div class="flex-1 flex flex-col pb-2">
                <div class="flex justify-around py-4 bg-purple-600 p-4">
                  <div class="flex mr-3">
                    <outline-puzzle-icon
                      class="w-6 h-6 text-white"
                    ></outline-puzzle-icon>
                  </div>
                  <div class="relative">
                    <h3 class="text-lg font-medium text-white">Textbaustein</h3>
                    <span class="text-white text-sm"
                      >Hier findest du Formulierungen aus den Antragskonzepten
                      wieder. Übernehme in dieses Dokument, ganz einfach per
                      Copy Paste</span
                    >
                    <button
                      class="focus:outline-none absolute right-0 top-0 text-white"
                      @click="sidebarOpen = !sidebarOpen"
                    >
                      <outline-x-icon class="w-5 h-5"></outline-x-icon>
                    </button>
                  </div>
                </div>

                <dl
                  class="flex-grow flex flex-col justify-between divide-y divide-gray-200"
                >
                  <dt class="sr-only">Title</dt>
                  <dd class="p-4 flex">
                    <div
                      class="rounded-full border border-black flex w-6 h-6 items-center justify-center mr-3"
                    >
                      1
                    </div>
                    <div class="flex flex-1 justify-between items-center">
                      <span class="text-black">Titlel</span>
                      <outline-chevron-right-icon
                        class="w-5 h-5 ml-4"
                      ></outline-chevron-right-icon>
                    </div>
                  </dd>
                  <dt class="sr-only">Probleme und Handlungsfelder</dt>
                  <dd class="p-4 flex">
                    <div
                      class="rounded-full border border-black flex w-6 h-6 items-center justify-center mr-3"
                    >
                      2
                    </div>
                    <div class="flex flex-1 justify-between items-center">
                      <span class="text-black"
                        >Probleme und Handlungsfelder</span
                      >
                      <outline-chevron-right-icon
                        class="w-5 h-5 ml-4"
                      ></outline-chevron-right-icon>
                    </div>
                  </dd>
                  <dt class="sr-only">Probleme und Handlungsfelder</dt>
                  <dd class="p-4 flex">
                    <div
                      class="rounded-full border border-black flex w-6 h-6 items-center justify-center mr-3"
                    >
                      3
                    </div>
                    <div class="flex flex-1 justify-between items-center">
                      <span class="text-black"
                        >Ratsmehrheiten und Fraktionsinteressen</span
                      >
                      <outline-chevron-right-icon
                        class="w-5 h-5 ml-4"
                      ></outline-chevron-right-icon>
                    </div>
                  </dd>
                  <dt class="sr-only">Argumente und Gegenargumente</dt>
                  <dd class="p-4 flex">
                    <div
                      class="rounded-full border border-black flex w-6 h-6 items-center justify-center mr-3"
                    >
                      4
                    </div>
                    <div class="flex flex-1 justify-between items-center">
                      <span class="text-black"
                        >Argumente und Gegenargumente</span
                      >
                      <outline-chevron-right-icon
                        class="w-5 h-5 ml-4"
                      ></outline-chevron-right-icon>
                    </div>
                  </dd>
                  <dt class="sr-only">Strategie</dt>
                  <dd class="p-4 flex">
                    <div
                      class="rounded-full border border-black flex w-6 h-6 items-center justify-center mr-3"
                    >
                      5
                    </div>
                    <div class="flex flex-1 justify-between items-center">
                      <span class="text-black">Strategie</span>
                      <outline-chevron-right-icon
                        class="w-5 h-5 ml-4"
                      ></outline-chevron-right-icon>
                    </div>
                  </dd>
                </dl>
              </div>
            </li>
          </ul>
        </transition>
      </template>
      <h2 class="text-gray-400">Heute, von Max</h2>
      <forms-section class="relative">
        <!--        <div
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
        </button>-->

        <FormulateInput
          type="text"
          rows="3"
          input-class="border-0 w-full focus:border-blue-300 focus:border-l-4 focus:outline-none focus:ring-0"
          label-class="font-bold pb-4 flex"
          label="Gegenstand"
          value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
        >
        </FormulateInput>

        <FormulateInput
          type="textarea"
          input-class="border-0 w-full focus:border-blue-300 focus:border-l-4 focus:outline-none focus:ring-0"
          label-class="font-bold pb-4 flex"
          rows="2"
          label="Beschlussvorschlag"
          value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"
        >
        </FormulateInput>

        <FormulateInput
          type="textarea"
          rows="4"
          label="Bezeichnung Handlungsauftrag"
          label-class="font-bold pb-4 flex"
          input-class="border-0 w-full focus:border-blue-300 focus:border-l-4 focus:outline-none focus:ring-0"
          value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        >
        </FormulateInput>
      </forms-section>
    </forms-layout>
  </FormulateForm>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ApplicationFormWriting',
  setup() {
    const sidebarOpen: Ref<boolean> = ref(false)
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
    return {
      enabledInputs,
      enableInput,
      checkInputEnabled,
      disableInput,
      sidebarOpen,
    }
  },
})
</script>
