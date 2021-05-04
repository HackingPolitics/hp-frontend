<template>
  <li class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
    <nuxt-link :to="{ name: routeTo, params: { id: 'erster' } }">
      <div class="w-full flex items-center justify-between p-6 space-x-6">
        <div v-if="!hasContent" class="flex-1 truncate">
          <div class="flex items-center space-x-3">
            <h3 class="text-gray-900 text-sm font-medium truncate">
              {{ (application && application.title) || 'Expresslinie' }}
            </h3>
            <span
              class="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full"
              >Admin</span
            >
          </div>
          <p class="mt-1 text-gray-500 text-sm truncate">
            {{ (application && application.location) || 'Dresden' }}
          </p>
        </div>
        <slot name="content"> </slot>
      </div>
    </nuxt-link>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'ApplicationCard',
  props: {
    application: {
      type: Object,
      default: null,
    },
    routeTo: {
      type: String,
      default: 'antraege-id',
    },
  },
  setup(props, context) {
    const hasContent = computed(() => {
      return !!context.slots.content
    })
    return { hasContent }
  },
})
</script>
