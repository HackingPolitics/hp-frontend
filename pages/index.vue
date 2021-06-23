<template>
  <layouts-header-title
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
  </layouts-header-title>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  onBeforeMount,
  ref,
  useContext,
  useRouter,
  useStore,
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
      projects.value = await store.dispatch('projects/fetchProjects')
    }
    const router = useRouter()
    const context = useContext()

    const createdProject: ComputedRef<IProject | null> = computed(
      (): IProject | null => store.state.projects.createdProject
    )
    const isLoggedIn: ComputedRef<IProject | null> = computed(
      () => store.getters['auth/isLoggedIn']
    )
    onBeforeMount(async () => {
      if (isLoggedIn.value && createdProject.value) {
        try {
          await store
            .dispatch('projects/createProject', createdProject.value)
            .then((res) => {
              router.push(
                context.localePath('/antraege/' + res.data.id.toString())
              )
            })
        } catch (error) {
          console.log(error)
        }
      }
    })

    const projectsLoading = computed(() => {
      return store.state.projects.isLoading
    })
    fetchProjects()

    watch(city, () => {
      fetchProjects()
    })
    return {
      projects,
      user,
      parseISO,
      city,
      options,
      projectsLoading,
    }
  },
})
</script>
