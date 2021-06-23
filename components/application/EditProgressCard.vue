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
            border border-black
            flex
            w-6
            h-6
            items-center
            justify-center
            mr-3
          "
        >
          {{ stepNumber }}
        </div>
        <span class="text-sm text-gray-400">
          {{ applicationStep.step.current }}/{{ applicationStep.step.total }}
          erledigt
        </span>
      </div>
      <h3 class="text-xl">{{ applicationStep.title }}</h3>
    </div>
    <div class="text-gray-500 text-sm">
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
        <span class="text-sm font-medium leading-none text-white">TW</span>
      </span>
      gerade aktiv
    </div>
  </nuxt-link>
</template>

<script>
const { defineComponent } = require('@nuxtjs/composition-api')

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
})
</script>
