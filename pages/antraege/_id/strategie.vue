<template>
  <layouts-header-title
    :menu-title="project ? project.title : null"
    title="Konzept"
    :link-to="{
      name: 'antraege-id',
      params: { id: project.id },
    }"
    :has-project-menu="true"
  >
    <forms-application-strategy></forms-application-strategy>
  </layouts-header-title>
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
  name: 'ApplicationStrategy',
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
