<template>
  <layouts-single-view title="Konzept">
    <application-header></application-header>
    <forms-application-strategy></forms-application-strategy>
  </layouts-single-view>
</template>

<script>
import { defineComponent, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ApplicationStrategy',
  setup() {
    const route = useRoute()
    console.log(route.value.params.id)
  },
})
</script>
