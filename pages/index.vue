<template>
  <layouts-single-view
    title="Stadtratsanträge in deiner Region und der ganzen Republik"
  >
    <div class="font-semibold text-3xl mt-16 flex relative overflow">
      {{ projects.length }} Anträge in
      <inline-dropdown v-model="city" :options="options"></inline-dropdown>
    </div>

    <application-grid
      :cols="3"
      class="mt-8"
      :projects="projects"
      :is-loading="projectsLoading"
    ></application-grid>
  </layouts-single-view>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  computed,
  ref,
  watch,
} from '@nuxtjs/composition-api'
import { parseISO } from 'date-fns'
import { RootState } from '~/store'
import { IProject } from '~/types/apiSchema'

export default defineComponent({
  name: 'ApplicationsPage',
  setup() {
    const city = ref<String | null>('Dresden')
    const projects = ref<IProject[]>([])
    const store = useStore<RootState>()
    const user = computed(() => store.state.auth.user)
    const options = ['Dresden', 'Berlin', 'München']
    const fetchProjects = async () => {
      const result = await store.dispatch('projects/fetchProjects')
      console.log(result)
      projects.value = result
    }
    const projectsLoading = computed(() => {
      return store.state.projects.isLoading
    })
    fetchProjects()

    watch(city, () => {
      fetchProjects()
    })
    return { projects, user, parseISO, city, options, projectsLoading }
  },
})
</script>
