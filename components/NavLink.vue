<template>
  <nuxt-link
    :to="localePath(to)"
    class="py-2 px-3 font-medium text-purple-100 nav-link"
    :class="
      type === 'desktop'
        ? `hover:bg-purple-500`
        : `block  py-2 px-3 text-basehover:text-white hover:bg-purple-400`
    "
    ><slot></slot
  ></nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'NavLink',
  props: {
    to: {
      type: String,
      required: true,
      default: '',
    },
    type: {
      type: String,
      default: 'desktop',
    },
  },
})
</script>
