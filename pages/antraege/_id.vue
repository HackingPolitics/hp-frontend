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
            v-for="item in 5"
            :key="item"
            class="flex flex-col justify-between p-4 h-40 bg-gray-100"
          >
            <div>
              <div class="text-sm text-gray-400">2/3 erledigt</div>
              <h3 class="text-xl">Thema</h3>
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
      </div>
    </div>
  </layouts-single-view>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'MeineAntraegePage',
  setup() {
    const route = useRoute()
    console.log(route.value.params.id)
  },
})
</script>
