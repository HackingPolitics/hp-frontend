<template>
  <div>
    <main class="relative">
      <header
        class="relative py-10 bg-purple-800 h-64"
        :style="
          featureImage
            ? `background-image: url(${featureImage}); background-size: cover; background-position: center center`
            : ''
        "
      >
        <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8"></div>
      </header>
      <div
        class="
          max-w-screen-xl
          mx-auto
          pb-6
          px-4
          sm:px-6
          lg:pb-16 lg:px-8
          -mt-8
          relative
        "
      >
        <slot />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'
import { RootState } from '~/store'

export default defineComponent({
  name: 'SingleView',
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  setup() {
    const store = useStore<RootState>()
    const featureImage = computed(() => {
      return store.state.projects.project.featureImage
    })
    return { featureImage }
  },
})
</script>
