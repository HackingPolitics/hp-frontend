<template>
  <div>
    <h3 class="mt-6 mb-2">{{ title }}</h3>
    <div>
      <slot> </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'SidebarTabSection',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
})
</script>
