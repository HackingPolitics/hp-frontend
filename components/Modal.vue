<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div></div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'

export default {
  setup() {
    const open = ref(true)

    return {
      open,
    }
  },
}
</script>
