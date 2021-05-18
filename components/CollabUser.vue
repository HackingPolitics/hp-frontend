<template>
  <div
    class="flex items-center justify-center text-white text-xs font-semibold h-8 w-8 rounded-full ring-2 ring-white"
    :class="getRandomBgColor()"
  >
    {{ userName }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { getRandomBgColor } from '~/utils/randomColors'

export default defineComponent({
  name: 'CollabUser',
  props: {
    userName: String,
  },
  setup() {
    return {
      getRandomBgColor,
    }
  },
})
</script>
