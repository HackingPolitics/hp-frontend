<template>
  <div class="mt-10 mb-6 bg-white py-6 px-4 rounded relative">
    <div>
      <slot name="header"></slot>
      <h3
        v-if="!hasHeaderSlot"
        class="text-lg font-medium leading-6 text-gray-900"
      >
        {{ title }}
      </h3>
      <p class="max-w-2xl text-sm text-gray-500 mt-1">
        {{ subtitle }}
      </p>
    </div>
    <div :class="{ 'pt-6': title, 'opacity-25 pointer-events-none': locked }">
      <slot></slot>
    </div>
    <span v-if="locked" class="absolute right-2 bottom-2 p-4">
      {{ lockedText }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'FormSection',
  props: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    locked: { type: Boolean, default: false },
    lockedText: { type: String, default: 'Gesperrt' },
  },
  setup(_, context) {
    const hasHeaderSlot = computed(() => {
      return !!context.slots.header
    })
    return { hasHeaderSlot }
  },
})
</script>
