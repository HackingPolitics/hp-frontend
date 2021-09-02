<template>
  <layouts-header-title
    title="Stadtratsanträge in deiner Region und der ganzen Republik"
  >
    <div class="flex justify-between w-full items-baseline mt-16">
      <div class="font-semibold text-3xl flex relative overflow">
        {{ totalItems ? totalItems : 0 }} Anträge
        <span v-if="councilOptions" class="flex ml-1">
          in
          <inline-dropdown
            v-model="city"
            :options="councilOptions"
          ></inline-dropdown>
        </span>
      </div>
      <base-button @click="$router.push('/antraege/erstellen')"
        >Neuen Antrag erstellen</base-button
      >
    </div>

    <application-grid
      :cols="3"
      class="mt-8"
      :projects="projects"
      :is-loading="projectsLoading"
      :current-page="currentPage"
      :total-pages="totalPages"
      @changePage="changePage"
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
  useStore,
  watch,
} from '@nuxtjs/composition-api'
import { parseISO } from 'date-fns'
import { RootState } from '~/store'
import { IParliament, IProject } from '~/types/apiSchema'

export default defineComponent({
  name: 'ApplicationsPage',
  setup() {
    const city = ref<any | null>(null)
    const store = useStore<RootState>()
    const user = computed(() => store.state.auth.user)
    const currentPage = ref(1)
    const totalPages = ref(1)
    const itemsPerPage = ref(15)
    const changePage = (page: number) => {
      currentPage.value = page
      fetchProjects()
    }

    const projects = computed<IProject[] | null>(() => {
      // @ts-ignore
      return store.state.projects?.projects?.['hydra:member']
    })

    const totalItems = computed<number | null>(() => {
      // @ts-ignore
      return store.state.projects?.projects?.['hydra:totalItems']
        ? // @ts-ignore
          store.state.projects?.projects?.['hydra:totalItems']
        : null
    })

    const fetchProjects = async () => {
      await store.dispatch('projects/fetchProjects', {
        page: currentPage.value,
        council: city.value ? city.value.value.id : null,
      })
      if (totalItems.value) {
        totalPages.value = Math.ceil(totalItems.value / itemsPerPage.value)
      }
    }

    const councils = computed(() => {
      return store.state.councils?.councils
    })

    const councilOptions = computed(() => {
      return councils.value?.['hydra:member']?.map((council: IParliament) => {
        return {
          label: council.title,
          value: { id: council.id, name: council.title },
        }
      })
    })

    watch(
      () => councilOptions.value,
      () => {
        city.value = councilOptions.value?.[0]
      }
    )

    store.dispatch('councils/fetchCouncils')

    const createdProjectMembership = computed(
      () => store.state.projects.createdProjectMembership
    )

    const isLoggedIn: ComputedRef<boolean | null> = computed(
      () => store.state.auth.loggedIn
    )
    onBeforeMount(async () => {
      if (isLoggedIn.value && createdProjectMembership.value) {
        try {
          const payload = {
            ...createdProjectMembership.value,
            user: user.value && user.value['@id'],
          }
          await store.dispatch('projects/applyForProject', payload).then(() => {
            store.commit('projects/SET_CREATED_PROJECT_MEMBERSHIP', null)
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

    watch(
      () => city.value,
      () => {
        console.log(city.value)
        fetchProjects()
      }
    )

    return {
      projects,
      councilOptions,
      user,
      parseISO,
      city,
      projectsLoading,
      currentPage,
      totalPages,
      itemsPerPage,
      totalItems,
      changePage,
    }
  },
})
</script>
