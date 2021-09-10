<template>
  <div class="p-4 flex">
    <div class="flex-grow flex flex-col justify-between">
      <a
        href="#"
        class="flex flex-1 justify-between items-center"
        @click.prevent="active = !active"
      >
        <div class="flex">
          <div
            v-if="step"
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
            {{ step }}
          </div>
          <h2 class="sr-only">{{ title }}</h2>
          <h2 class="text-black">{{ title }}</h2>
        </div>
        <span v-show="!active">
          <outline-chevron-right-icon
            class="w-5 h-5 ml-4"
          ></outline-chevron-right-icon
        ></span>
        <span v-show="active">
          <outline-chevron-down-icon
            class="w-5 h-5 ml-4"
          ></outline-chevron-down-icon
        ></span>
      </a>

      <div v-show="active" class="tab__content p-2"><slot /></div>
    </div>
    <div />
  </div>
</template>

<script>
const { defineComponent, ref } = require('@nuxtjs/composition-api')
export default defineComponent({
  name: 'Accordion',
  props: {
    title: {
      type: String,
      default: '',
    },
    step: {
      type: Number,
      default: null,
    },
  },
  setup() {
    const active = ref(false)

    return {
      active,
    }
  },
})
</script>
