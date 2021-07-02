<template>
  <nuxt-link
    :to="localePath(to)"
    class="
      text-gray-900
      hover:text-gray-900 hover:bg-gray-50
      group
      rounded-md
      px-3
      py-2
      flex
      items-center
      text-sm
      font-medium
      admin-sidebar-link
    "
  >
    <slot></slot>
    <span class="truncate"> {{ title }} </span>
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AdminNavLink',
  props: {
    to: {
      type: String,
      default: '/',
    },
    title: {
      type: String,
      default: '/',
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="postcss">
.admin-sidebar-link.nuxt-link-active {
  @apply bg-gray-50 text-purple-600 hover:bg-white;
}

.admin-sidebar-link.nuxt-link-active .icon {
  @apply text-purple-500;
}
</style>
