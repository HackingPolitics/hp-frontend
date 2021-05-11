<template>
  <layouts-single-view>
    <application-header></application-header>
    <forms-application-theme></forms-application-theme>
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
