<template>
  <div>
    <nav
      v-if="steps"
      class="flex items-center justify-end"
      aria-label="Progress"
    >
      <p class="text-sm font-medium">
        Step {{ steps.findIndex((step) => step.status === 'current') + 1 }} of
        {{ steps.length }}
      </p>
      <ol class="ml-8 flex items-center space-x-5">
        <li v-for="step in steps" :key="step.name">
          <a
            v-if="step.status === 'complete'"
            :href="step.href"
            class="
              block
              w-2.5
              h-2.5
              bg-indigo-600
              rounded-full
              hover:bg-indigo-900
            "
          >
            <span class="sr-only">{{ step.name }}</span>
          </a>
          <a
            v-else-if="step.status === 'current'"
            :href="step.href"
            class="relative flex items-center justify-center"
            aria-current="step"
          >
            <span class="absolute w-5 h-5 p-px flex" aria-hidden="true">
              <span class="w-full h-full rounded-full bg-indigo-200" />
            </span>
            <span
              class="relative block w-2.5 h-2.5 bg-indigo-600 rounded-full"
              aria-hidden="true"
            />
            <span class="sr-only">{{ step.name }}</span>
          </a>
          <a
            v-else
            :href="step.href"
            class="block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400"
          >
            <span class="sr-only">{{ step.name }}</span>
          </a>
        </li>
      </ol>
    </nav>
    <div class="flex mt-8">
      <application-concept-side-bar
        v-if="!noConceptSidebar"
      ></application-concept-side-bar>
      <div>
        <slot name="left-side"></slot>
      </div>
      <main class="mx-auto max-auto px-4 lg:pb-12 relative flex-1 mx-10">
        <!--        <button class="absolute -left-44" @click="goBack()">
          <outline-chevron-left-icon
            class="w-10 h-10"
          ></outline-chevron-left-icon>
        </button>-->
        <h1 class="text-3xl font-extrabold text-blue-gray-900 mb-4">
          {{ title }}
        </h1>
        <slot> </slot>
        <div class="pt-8 flex justify-end">
          <slot name="actions"></slot>
          <div v-if="!hasActionSlots && !noActions" class="flex justify-end">
            <button
              type="button"
              class="
                bg-white
                py-2
                px-4
                border border-gray-300
                rounded-md
                shadow-sm
                text-sm
                font-medium
                text-gray-700
                hover:bg-gray-50
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500
              "
            >
              Zurück
            </button>
            <button
              type="submit"
              class="
                ml-3
                inline-flex
                justify-center
                py-2
                px-4
                border border-transparent
                rounded-md
                shadow-sm
                text-sm
                font-medium
                text-white
                bg-light-blue-500
                hover:bg-light-blue-600
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500
              "
            >
              Speichern
            </button>
          </div>
          <div
            v-if="!noFloatingSidebar"
            class="absolute -right-24 bottom-16 flex-col"
          >
            <button
              type="button"
              class="
                flex
                items-center
                p-1
                border border-transparent
                rounded-full
                shadow-sm
                text-white
                bg-indigo-600
                hover:bg-indigo-700
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                mb-4
              "
            >
              <outline-chat-icon class="w-7 h-7" />
            </button>
            <button
              type="button"
              class="
                flex
                items-center
                p-1
                border border-transparent
                rounded-full
                shadow-sm
                text-white
                bg-indigo-600
                hover:bg-indigo-700
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              "
            >
              <!-- Heroicon name: outline/plus -->
              <outline-question-mark-circle-icon class="w-7 h-7" />
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Layout',
  props: {
    title: {
      type: String,
      default: '',
    },
    steps: {
      type: Array,
      default: null,
    },
    noActions: {
      type: Boolean,
      default: false,
    },
    noConceptSidebar: {
      type: Boolean,
      default: false,
    },
    noFloatingSidebar: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: null,
    },
    currentStep: {
      type: Number,
      default: 1,
    },
  },
  setup(props, context) {
    const router = useRouter()
    const hasActionSlots = computed(() => {
      return !!context.slots.actions
    })
    function goBack() {
      router.go(-1)
    }
    return { hasActionSlots, goBack }
  },
})
</script>
