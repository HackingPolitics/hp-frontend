<template>
  <button
    class="
      rounded-full
      text-sm text-gray-600
      border border-gray-600
      p-1
      px-2
      bg-white
      flex
      items-center
      justify-center
      hover:text-white hover:bg-purple-500
      transition
      duration-500
      ease-in-out
      w-32
    "
    @click="$emit('click')"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <slot v-if="!hover" :hover="hover"></slot>
    <slot v-else name="hover" :hover="hover"> </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'MouseOverButton',
  setup() {
    const hover = ref<Boolean>(false)

    return {
      hover,
    }
  },
})
</script>
