<template>
  <layouts-header-title
    :menu-title="project ? project.title : null"
    title="Konzept"
    :link-to="{
      name: 'antraege-id',
      params: { id: project ? project.id : null },
    }"
    :has-project-menu="true"
  >
    <forms-application-theme></forms-application-theme>
  </layouts-header-title>
</template>

<script>
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import useProject from '~/composables/useProject'

export default defineComponent({
  name: 'ApplicationProblem',
  setup() {
    const route = useRoute()
    const { project, isLoading } = useProject(route.value.params.id)

    return { project, isLoading }
  },
})
</script>
