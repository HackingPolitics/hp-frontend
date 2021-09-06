<template>
  <div
    class="my-2 relative group shadow-md cursor-pointer"
    :class="{
      'ring-2 ring-inset ring-indigo-500': active,
      'px-6 py-2 bg-gray-100': sub,
      'p-6 pb-8 sidebar-card bg-white': !sub,
    }"
    @click="$emit('click')"
  >
    <div>
      <h3 class="text-lg font-medium">
        <!-- Extend touch target to entire panel -->
        <span class="absolute inset-0" aria-hidden="true"></span>
        {{ title }}
        <span
          v-if="subtitle"
          class="text-sm text-gray-400"
          :class="{ 'ml-3': title }"
          >{{ subtitle }}</span
        >
      </h3>

      <p class="mt-2 text-sm text-gray-800 break-all">
        <slot></slot>
      </p>
    </div>
    <outline-check-icon
      v-if="!noCheckIcon"
      class="h-5 w-5 absolute top-4 right-4"
      :class="{ 'text-teal-500': active, 'text-gray-300': !active }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ModuleCard',
  props: {
    title: {
      type: [String, Number],
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
    subtitle: {
      type: String,
      default: '',
    },
    sub: {
      type: Boolean,
      default: false,
    },
    noCheckIcon: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
})
</script>

<style scoped>
.sidebar-card {
  min-height: 7rem;
}
</style>
