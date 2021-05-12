<template>
  <layouts-single-view>
    <application-header></application-header>
    <div class="-mt-6 space-y-16">
      <div>
        <div class="pb-5 border-b border-gray-200 mb-8 bg-white p-4 rounded">
          <div class="-ml-2 -mt-2 flex flex-wrap items-baseline">
            <h3 class="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
              Antragskonzept
            </h3>
            <div class="flex ml-4">
              <progress-bar progress="10"></progress-bar>
            </div>
          </div>
        </div>
        <div class="grid sm:grid-cols-3 gap-8 pt-4">
          <div
            v-for="(applicationStep, index) in applicationSteps"
            :key="index"
            class="p-4 h-40 bg-gray-200 flex"
          >
            <nuxt-link
              :to="{ name: applicationStep.href, params: { id: projectId } }"
              class="flex-col justify-between flex"
            >
              <div class="flex-col">
                <div class="inline-flex mb-2 items-center">
                  <div
                    class="rounded-full border border-black flex w-6 h-6 items-center justify-center mr-3"
                  >
                    {{ index + 1 }}
                  </div>
                  <span class="text-sm text-gray-400">
                    {{ applicationStep.step.current }}/{{
                      applicationStep.step.total
                    }}
                    erledigt
                  </span>
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
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="pb-5 border-b border-gray-200 mb-8">
        <div
          class="-ml-2 -mt-2 mb-4 flex flex-wrap items-baseline justify-between"
        >
          <h3 class="ml-2 text-xl leading-6 font-medium text-lg text-gray-900">
            Antrag schreiben
          </h3>

          <button class="inline-flex items-center">
            <solid-eye-icon class="w-7 h-7 pr-2"></solid-eye-icon>
            <span class="font-medium text-lg">PDF-Vorschau</span>
          </button>
        </div>
        <nuxt-link
          :to="{ name: 'antraege-id-schreiben', params: { id: projectId } }"
        >
          <application-list></application-list>
        </nuxt-link>
      </div>
    </div>
  </layouts-single-view>
</template>

<script lang="ts">
import { defineComponent, useRoute, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MeineAntraegePage',

  setup() {
    const route = useRoute()
    const projectId = ref(route.value.params.id)
    const applicationSteps = ref([
      {
        title: 'Thema',
        step: {
          current: 1,
          total: 3,
        },
        href: 'antraege-id-thema',
      },
      {
        title: 'Probleme Handlungsfelder',
        step: {
          current: 0,
          total: 2,
        },
        href: 'antraege-id-problem',
      },
      {
        title: 'Ratsmehrheiten und Fraktionsinteressen',
        step: {
          current: 0,
          total: 2,
        },
        href: 'antraege-id-problem',
      },
      {
        title: 'Argumente und Gegenargumente',
        step: {
          current: 0,
          total: 2,
        },
        href: 'antraege-id-argumente',
      },
      {
        title: 'Strategie',
        step: {
          current: 0,
          total: 6,
        },
         href: 'antraege-id-strategie',
      },
    ])
    return { applicationSteps, projectId }
  },
})
</script>
