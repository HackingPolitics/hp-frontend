<template>
  <div class="mt-10 mb-6 bg-white pt-6 pb-2 px-4 rounded">
    <div>
      <slot name="header"></slot>
      <h3 v-if="!hasHeaderSlot" class="text-lg leading-6 text-gray-900">
        {{ title }}
      </h3>
      <p class="max-w-2xl text-sm text-gray-500 mt-1">
        {{ subtitle }}
      </p>
    </div>
    <div class="pt-6">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'FormSection',
  props: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
  },
  setup(_, context) {
    const hasHeaderSlot = computed(() => {
      return !!context.slots.header
    })
    return { hasHeaderSlot }
  },
})
</script>
