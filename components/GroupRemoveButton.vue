<template>
  <button @click="removeItem()">
    <div
      class="
        ml-4
        rounded-full
        h-6
        w-6
        bg-gray-200
        flex
        justify-center
        items-center
        hover:bg-purple-500
        cursor-pointer
        group
      "
    >
      <solid-x-icon
        class="w-4 h-4 text-gray-400 group-hover:text-white"
      ></solid-x-icon>
    </div>
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
