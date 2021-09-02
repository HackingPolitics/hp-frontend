<template>
  <layouts-header-title :title="pageContent.title">
    <div class="bg-white rounded-lg shadow overflow-hidden p-12 mt-16">
      <nuxt-content class="prose" :document="pageContent" />
    </div>
  </layouts-header-title>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Imprint',
  async asyncData({ $content }) {
    const pageContent = await $content('imprint').fetch()
    return {
      pageContent,
    }
  },
})
</script>
