<template>
  <div class="grid grid-cols-8 h-full max-w-screen-xl mx-auto">
    <div :class="sidebarOpen ? 'col-span-2' : 'col-span-1'">
      <div v-if="!sidebarOpen" class="flex justify-center mt-4">
        <button class="focus:outline-none" @click="sidebarOpen = !sidebarOpen">
          <outline-puzzle-icon class="w-7 h-7"></outline-puzzle-icon>
        </button>
      </div>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0"
        enter-to-class="transform opacity-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100"
        leave-to-class="transform opacity-0"
      >
        <ul v-if="sidebarOpen">
          <li class="col-span-2 flex flex-col divide-y divide-gray-200">
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
                    wieder. Übernehme in dieses Dokument, ganz einfach per Copy
                    Paste</span
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
                class="
                  flex-grow flex flex-col
                  justify-between
                  divide-y divide-gray-400
                "
              >
                <dt class="sr-only">Title</dt>
                <dd class="p-4 flex">
                  <div
                    class="
                      rounded-full
                      border border-black
                      flex
                      w-6
                      h-6
                      items-center
                      justify-center
                      mr-3
                    "
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
                    class="
                      rounded-full
                      border border-black
                      flex
                      w-6
                      h-6
                      items-center
                      justify-center
                      mr-3
                    "
                  >
                    2
                  </div>
                  <div class="flex flex-1 justify-between items-center">
                    <span class="text-black">Probleme und Handlungsfelder</span>
                    <outline-chevron-right-icon
                      class="w-5 h-5 ml-4"
                    ></outline-chevron-right-icon>
                  </div>
                </dd>
                <dt class="sr-only">Probleme und Handlungsfelder</dt>
                <dd class="p-4 flex">
                  <div
                    class="
                      rounded-full
                      border border-black
                      flex
                      w-6
                      h-6
                      items-center
                      justify-center
                      mr-3
                    "
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
                    class="
                      rounded-full
                      border border-black
                      flex
                      w-6
                      h-6
                      items-center
                      justify-center
                      mr-3
                    "
                  >
                    4
                  </div>
                  <div class="flex flex-1 justify-between items-center">
                    <span class="text-black">Argumente und Gegenargumente</span>
                    <outline-chevron-right-icon
                      class="w-5 h-5 ml-4"
                    ></outline-chevron-right-icon>
                  </div>
                </dd>
                <dt class="sr-only">Strategie</dt>
                <dd class="p-4 flex">
                  <div
                    class="
                      rounded-full
                      border border-black
                      flex
                      w-6
                      h-6
                      items-center
                      justify-center
                      mr-3
                    "
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
    </div>

    <collaboration-editor
      :class="sidebarOpen ? 'col-span-6' : 'col-span-7'"
    ></collaboration-editor>
  </div>
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
