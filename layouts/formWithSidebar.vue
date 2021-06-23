<template>
  <div class="min-h-screen bg-gray-200">
    <div>
      <div class="relative">
        <menu-project-nav
          :title="project ? project.title : 'zurück'"
          :link-to="{
            name: 'antraege-id',
            params: { id: route.params.id },
          }"
        ></menu-project-nav>
      </div>

      <main class="relative">
        <header class="relative py-12 bg-purple-800">
          <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-normal text-white max-w-2xl">Konzept</h1>
          </div>
        </header>
        <div
          class="
            max-w-screen-xl
            mx-auto
            pb-6
            px-4
            sm:px-6
            lg:pb-16 lg:px-8
            grid grid-cols-3
          "
        >
          <application-concept-sidebar></application-concept-sidebar>
          <div class="px-4 sm:px-0 lg:pb-12 relative flex-1 pt-12 col-span-2">
            <Nuxt />
          </div>
        </div>
      </main>
    </div>

    <notification-toast />
  </div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import useProject from '~/composables/useProject'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { project, isLoading } = useProject(route.value.params.id)

    return { project, isLoading, route }
  },
})
</script>
