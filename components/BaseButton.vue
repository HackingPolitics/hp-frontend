<template>
  <button
    class="
      flex
      justify-center
      py-2
      px-4
      text-sm
      font-medium
      rounded-md
      bg-purple-500
      text-white
      hover:bg-purple-600
      focus:outline-none focus:border-purple-700 focus:shadow-outline-purple
      active:border-purple-700
      transition
      duration-150
      ease-in-out
    "
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
