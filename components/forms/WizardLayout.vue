<template>
  <div class="">
    <div class="flex justify-between mb-8 items-center">
      <h2 class="text-2xl font-normal text-blue-gray-900">
        {{ title }}
      </h2>
      <nav
        v-if="steps"
        class="flex items-center justify-end"
        aria-label="Progress"
      >
        <p class="text-sm font-medium">
          {{ $t('step') }}
          {{ currentStep }}
          {{ $t('of') }}
          {{ steps.length }}
        </p>
        <ol class="ml-8 flex items-center space-x-5">
          <li v-for="(step, i) in steps" :key="step.name">
            <a
              v-if="currentStep > i + 1"
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
              v-else-if="currentStep === i + 1"
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
              class="
                block
                w-2.5
                h-2.5
                bg-gray-200
                rounded-full
                hover:bg-gray-400
              "
            >
              <span class="sr-only">{{ step.name }}</span>
            </a>
          </li>
        </ol>
      </nav>
    </div>
    <main class="mx-auto max-auto px-4 lg:pb-12 relative flex-1">
      <slot> </slot>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'WizardLayout',
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
  setup(_, context) {
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
