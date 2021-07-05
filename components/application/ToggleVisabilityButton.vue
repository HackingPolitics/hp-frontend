<template>
  <div class="flex flex-col items-end">
    <span class="text-sm text-gray-500">Sichtbarkeit ändern</span>
    <button
      type="button"
      class="
        mt-2
        bg-gray-200
        relative
        inline-flex
        flex-shrink-0
        h-6
        w-11
        border-2 border-transparent
        rounded-full
        cursor-pointer
        transition-colors
        ease-in-out
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-purple-500
      "
      role="switch"
      :aria-checked="isActive"
      @click="toggle"
    >
      <span class="sr-only">Use setting</span>
      <span
        class="
          pointer-events-none
          relative
          inline-block
          h-5
          w-5
          rounded-full
          bg-white
          shadow
          transform
          ring-0
          transition
          ease-in-out
          duration-200
        "
        :class="isActive ? 'translate-x-5' : 'translate-x-0'"
      >
        <span
          class="
            opacity-100
            ease-in
            duration-200
            absolute
            inset-0
            h-full
            w-full
            flex
            items-center
            justify-center
            transition-opacity
          "
          :class="
            isActive
              ? 'opacity-0 ease-out duration-100'
              : 'opacity-100 ease-in duration-200'
          "
          aria-hidden="true"
        >
          <svg
            v-if="!isActive"
            class="h-3 w-3 text-gray-400"
            fill="none"
            viewBox="0 0 12 12"
          >
            <path
              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <!-- Enabled: "opacity-100 ease-in duration-200", Not Enabled: "opacity-0 ease-out duration-100" -->
        <span
          class="
            opacity-0
            ease-out
            duration-100
            absolute
            inset-0
            h-full
            w-full
            flex
            items-center
            justify-center
            transition-opacity
          "
          :class="
            isActive
              ? 'opacity-100 ease-in duration-200'
              : 'opacity-0 ease-out duration-100'
          "
          aria-hidden="true"
        >
          <svg
            v-if="isActive"
            class="h-3 w-3 text-purple-600"
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            <path
              d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
            />
          </svg>
        </span>
      </span>
    </button>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ToggleVisabilityButton',
  props: {
    state: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    const isActive = ref(true)
    const toggle = () => {
      isActive.value = !isActive.value
      emit('toggle', isActive.value)
    }

    watch(
      () => props.state,
      () => {
        isActive.value = props.state
      },
      {
        immediate: true,
      }
    )

    return { isActive, toggle }
  },
})
</script>
