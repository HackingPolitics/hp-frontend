<template>
  <nuxt-link
    :to="
      localePath({
        name: applicationStep.href,
        params: { id: projectId },
      })
    "
    class="flex-col justify-between flex"
  >
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
    <div v-if="false" class="text-gray-500 mt-6">
      <span
        class="
          inline-flex
          items-center
          justify-center
          h-8
          w-8
          rounded-full
          bg-gray-500
        "
      >
        <span class="font-medium leading-none text-white">TW</span>
      </span>
      {{ $t('currentActive') }}
    </div>
  </nuxt-link>
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
  },
  setup() {
    return {}
  },
})
</script>
