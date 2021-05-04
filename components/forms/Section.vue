<template>
  <div class="mt-10 divide-y divide-y-reverse divide-gray-200">
    <div>
      <slot name="header"></slot>
      <h3
        v-if="!hasHeaderSlot"
        class="text-lg leading-6 font-medium text-gray-900"
      >
        {{ title }}
      </h3>
      <p class="max-w-2xl text-sm text-gray-500">
        {{ subtitle }}
      </p>
    </div>
    <div class="mt-4">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'FormLayout',
  props: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
  },
  setup(props, context) {
    const hasHeaderSlot = computed(() => {
      return !!context.slots.header
    })
    return { hasHeaderSlot }
  },
})
</script>
