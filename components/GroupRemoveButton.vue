<template>
  <remove-button @click="removeItem()" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GroupRemoveButton',
  props: {
    context: {
      type: Object,
      required: true,
    },
    removeItem: Function,
  },
})
</script>
