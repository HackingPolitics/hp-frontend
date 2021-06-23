<template>
  <layouts-full-width
    :title="project ? project.title : null"
    :link-to="{
      name: 'antraege-id',
      params: { id: project.id },
    }"
  >
    <forms-application-writing></forms-application-writing>
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
