<template>
  <span
    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
    :class="chipClass"
  >
    <slot> </slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Chip',
  props: {
    chipClass: {
      type: String,
      default: 'bg-purple-200 text-purple-800',
    },
  },
})
</script>
