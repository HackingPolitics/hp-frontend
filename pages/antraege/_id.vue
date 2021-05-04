<template>
  <layouts-single-view>
    <application-header></application-header>
    <div class="p-6 space-y-16">
      <div>
        <div class="pb-5 border-b border-gray-200 mb-8">
          <div class="-ml-2 -mt-2 flex flex-wrap items-baseline">
            <h3 class="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
              Antragskonzept
            </h3>
            <p class="ml-2 mt-1 text-sm text-gray-500 truncate">10% Klarheit</p>
          </div>
        </div>
        <div class="grid sm:grid-cols-3 gap-8">
          <div
            v-for="(applicationStep, index) in applicationSteps"
            :key="index"
            class="flex flex-col justify-between p-4 h-40 bg-gray-100"
          >
            <div>
              <div class="text-sm text-gray-400">
                {{ applicationStep.step.current }}/{{
                  applicationStep.step.total
                }}
                erledigt
              </div>
              <h3 class="text-xl">{{ applicationStep.title }}</h3>
            </div>
            <div class="text-gray-500 text-sm">
              <span
                class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500"
              >
                <span class="text-sm font-medium leading-none text-white"
                  >TW</span
                >
              </span>
              gerade aktiv
            </div>
          </div>
        </div>
      </div>
      <div class="pb-5 border-b border-gray-200 mb-8">
        <div class="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 class="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
            Antrag schreiben
          </h3>
        </div>
        <forms-application-thema></forms-application-thema>
        <forms-application-probleme></forms-application-probleme>
      </div>
    </div>
  </layouts-single-view>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { ref } from '@vue/composition-api'
export default defineComponent({
  name: 'MeineAntraegePage',
  setup() {
    const route = useRoute()
    const applicationSteps = ref([
      {
        title: 'Thema',
        step: {
          current: 1,
          total: 3,
        },
      },
      {
        title: 'Probleme Handlungsfelder',
        step: {
          current: 0,
          total: 2,
        },
      },
      {
        title: 'Ratsmehrheiten und Fraktionsinteressen',
        step: {
          current: 0,
          total: 2,
        },
      },
      {
        title: 'Argumente und Gegenargumente',
        step: {
          current: 0,
          total: 2,
        },
      },
      {
        title: 'Strategie',
        step: {
          current: 0,
          total: 6,
        },
      },
    ])
    return { applicationSteps }
  },
})
</script>
