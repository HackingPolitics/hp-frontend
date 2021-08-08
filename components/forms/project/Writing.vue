<template>
  <div class="grid grid-cols-8 h-full max-w-screen-xl mx-auto">
    <div :class="sidebarOpen ? 'col-span-2' : 'col-span-1'">
      <div v-if="!sidebarOpen" class="flex justify-center mt-4">
        <button class="focus:outline-none" @click="sidebarOpen = !sidebarOpen">
          <outline-puzzle-icon class="w-7 h-7"></outline-puzzle-icon>
        </button>
      </div>
      <writing-sidebar
        :sidebar-open="sidebarOpen"
        @close-sidebar="sidebarOpen = false"
      />
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
