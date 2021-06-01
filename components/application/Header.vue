<template>
  <div
    class="rounded-lg bg-white overflow-hidden shadow mb-16"
  >
    <h2 id="profile-overview-title" class="sr-only">Profile Overview</h2>
    <div class="bg-white p-6">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="sm:flex sm:space-x-5">
          <div class="text-center sm:mt-0 sm:pt-1 sm:text-left">
            <h3 class="text-xl font-bold text-gray-900 sm:text-2xl pb-2">
              {{ application && application.title }}
            </h3>
            <div class="inline-flex items-center">
              <p class="text-sm font-medium text-gray-600">Dresden</p>
              <outline-location-marker-icon
                class="w-5 h-5 ml-1 mr-4"
              ></outline-location-marker-icon>
              <chip class="mr-2">Infrastruktur</chip>
              <chip>Mobilität</chip>
            </div>
          </div>
        </div>
        <div
          v-if="application && application.memberships"
          class="flex flex-col justify-center"
        >
          <span class="pb-2 text-teal-500 text-center">
            {{ application.memberships.length }} Mitglieder</span
          >
          <avatar-group :avatars="application.memberships"> </avatar-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, useStore } from '@nuxtjs/composition-api'
import { RootState } from '~/store'

export default defineComponent({
  name: 'ApplicationHeader',
  setup() {
    const store = useStore()
    const application = computed(() => store.state.projects.project)
    return { application }
  },
})
</script>
