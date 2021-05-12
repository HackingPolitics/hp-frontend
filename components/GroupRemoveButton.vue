<template>
  <button @click="removeItem()">
    <solid-x-icon class="w-7 h-7 mb-4 ml-4 text-red-500"></solid-x-icon>
  </button>
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
