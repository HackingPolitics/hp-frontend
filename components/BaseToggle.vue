<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <button
    type="button"
    class="
      flex-shrink-0
      group
      relative
      rounded-full
      inline-flex
      items-center
      justify-center
      h-5
      w-10
      cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
    "
    role="switch"
    aria-checked="false"
    @click="$emit('input', !value)"
  >
    <span class="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      class="pointer-events-none absolute bg-white w-full h-full rounded-md"
    ></span>

    <span
      aria-hidden="true"
      class="
        pointer-events-none
        absolute
        h-4
        w-9
        mx-auto
        rounded-full
        transition-colors
        ease-in-out
        duration-200
      "
      :class="value ? 'bg-green-500' : 'bg-gray-200'"
    ></span>
    <span
      aria-hidden="true"
      class="
        pointer-events-none
        absolute
        left-0
        inline-block
        h-5
        w-5
        border border-gray-200
        rounded-full
        bg-white
        shadow
        transform
        ring-0
        transition-transform
        ease-in-out
        duration-200
      "
      :class="value ? 'translate-x-5' : 'translate-x-0'"
    ></span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Toggle',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  },
})
</script>
