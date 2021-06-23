<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div
    v-if="open"
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block sm:p-0
      "
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="
          inline-block
          align-bottom
          bg-white
          rounded-lg
          px-4
          pt-5
          pb-4
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6
        "
      >
        <div>
          <div class="mt-3 sm:mt-5">
            <h3
              v-if="modalTitle"
              id="modal-title"
              class="text-lg leading-6 font-medium text-gray-900 mb-4"
            >
              {{ modalTitle }}
            </h3>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    modalTitle: {
      type: String,
      default: '',
    },
  },
  setup() {
    const open = ref(false)

    const toggleModal = () => {
      open.value = !open.value
    }
    return {
      open,
      toggleModal,
    }
  },
})
</script>
