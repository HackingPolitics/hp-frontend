<template>
  <div class="flex justify-center items-center">
    <nuxt-link
      :to="localePath('index', 'de')"
      class="py-2 px-3 font-medium text-white rounded-md hover:bg-purple-500"
      >Deutsch</nuxt-link
    >
    <nuxt-link
      :to="localePath('index', 'en')"
      class="py-2 px-3 font-medium text-white rounded-md hover:bg-purple-500"
      >English</nuxt-link
    >
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
