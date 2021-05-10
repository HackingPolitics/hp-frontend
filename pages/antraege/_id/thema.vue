<template>
  <div>
    <layouts-single-view title="Neuen Antrag erstellen">
      <application-header></application-header>
      <forms-application-theme
        class="w-full bg-white rounded"
      ></forms-application-theme>
    </layouts-single-view>
  </div>
</template>

<script>
import { defineComponent, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ApplicationTopic',
  setup() {
    const route = useRoute()
    console.log(route.value.params.id)
  },
})
</script>
