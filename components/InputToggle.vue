<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
  >
    <label>
      <input
        type="checkbox"
        name="toggle"
        :checked="context.model"
        class="opacity-0 w-1 h-1"
        @change.stop="toggle"
      />
      <span
        :class="{ 'bg-gray-200': !context.model, 'bg-teal-500': context.model }"
        class="
          relative
          inline-block
          flex-no-shrink
          h-6
          w-11
          border-2 border-transparent
          rounded-full
          cursor-pointer
          transition-colors
          ease-in-out
          duration-200
          focus:outline-none focus:shadow-outline
        "
        role="checkbox"
        tabindex="0"
        :aria-checked="context.model.toString()"
      >
        <span
          aria-hidden="true"
          :class="{
            'translate-x-5': context.model,
            'translate-x-0': !context.model,
          }"
          class="
            relative
            inline-block
            h-5
            w-5
            rounded-full
            bg-white
            shadow
            transform
            transition
            ease-in-out
            duration-200
          "
        >
          <span
            :class="{
              'opacity-0 ease-out duration-100': context.model,
              'opacity-100 ease-in duration-200': !context.model,
            }"
            class="
              absolute
              inset-0
              h-full
              w-full
              flex
              items-center
              justify-center
              transition-opacity
            "
          >
            <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
              <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span
            :class="{
              'opacity-100 ease-in duration-200': context.model,
              'opacity-0 ease-out duration-100': !context.model,
            }"
            class="
              absolute
              inset-0
              h-full
              w-full
              flex
              items-center
              justify-center
              transition-opacity
            "
          >
            <svg
              class="h-3 w-3 text-teal-600"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path
                d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
              />
            </svg>
          </span>
        </span>
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Toggle',
  props: {
    context: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const toggle = () => {
      // eslint-disable-next-line
        props.context.model = !props.context.model
    }
    return {
      toggle,
    }
  },
})
</script>
