<template>
  <layouts-full-width
    :title="project ? project.title : null"
    :link-to="{
      name: 'antraege-id',
      params: { id: project.id },
    }"
  >
    <forms-project-writing></forms-project-writing>
  </layouts-full-width>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  computed,
  useRoute,
} from '@nuxtjs/composition-api'
import { RootState } from '~/store'

export default defineComponent({
  name: 'ApplicationWriting',
  meta: {
    area: 'Schreiben',
  },
  layout: 'collaboration',
  setup() {
    const store = useStore<RootState>()

    const project = computed(() => {
      return store.state.projects.project
    })

    const isLoading = computed(() => {
      return store.state.projects.isLoading
    })

    const route = useRoute()

    store.dispatch('projects/fetchProject', route.value.params.id)
    return { project, isLoading }
  },
})
</script>
