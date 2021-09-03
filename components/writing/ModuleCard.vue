<template>
  <div
    class="
      my-4
      rounded-lg
      relative
      group
      bg-white
      p-6
      focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500
    "
    @click="$emit('copy')"
  >
    <div class="mt-4">
      <h3 class="text-lg font-medium">
        <a href="#" class="focus:outline-none">
          <!-- Extend touch target to entire panel -->
          <span class="absolute inset-0" aria-hidden="true"></span>
          {{ title }}
        </a>
      </h3>
      <p class="mt-2 text-sm text-gray-500">
        <slot></slot>
      </p>
    </div>
    <span
      class="
        pointer-events-none
        absolute
        top-4
        right-4
        text-gray-300
        group-hover:text-gray-400
      "
      aria-hidden="true"
    >
      <outline-duplicate-icon class="h-6 w-6"></outline-duplicate-icon>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ModuleCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  setup() {},
})
</script>
