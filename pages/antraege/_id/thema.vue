<template>
  <div>
    <main-nav></main-nav>
    <breadcrumps-bar></breadcrumps-bar>
    <forms-application-thema></forms-application-thema>
  </div>
</template>

<script>
import { defineComponent, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'theme',
  setup() {
    const route = useRoute()
    console.log(route.value.params.id)
  },
})
</script>
