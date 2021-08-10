<template>
  <div class="p-4 bg-white flex-col rounded h-full">
    <div class="flex-col">
      <div class="inline-flex mb-2 items-center">
        <div
          class="
            rounded-full
            border-black border-2
            flex
            w-8
            h-8
            items-center
            justify-center
            mr-3
            font-medium
          "
        >
          {{ stepNumber }}
        </div>
        <span
          v-if="applicationStep && applicationStep.step"
          class="text-gray-400"
        >
          {{ applicationStep.step.done }}/{{ applicationStep.step.total }}
          {{ $t('done') }}
        </span>
      </div>
      <h3 class="text-xl font-medium mt-2">{{ applicationStep.title }}</h3>
    </div>
    <div
      v-for="user in onlineUsers"
      :key="user.id"
      class="text-gray-500 mt-6 flex flex-1"
    >
      <div v-if="user.area === area">
        <base-avatar :user="user"></base-avatar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'EditProgressCard',
  props: {
    applicationStep: {
      type: Object,
      default: () => {},
    },
    projectId: {
      type: String,
      default: '',
      required: true,
    },
    stepNumber: {
      type: Number,
      default: 0,
    },
    canEdit: {
      type: Boolean,
      default: false,
    },
    onlineUsers: {
      type: Array,
      default: () => [],
    },
    area: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {}
  },
})
</script>
