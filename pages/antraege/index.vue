<template>
  <layouts-header-title :title="$t('page.myproposals.title')">
    <div class="sm:flex mt-4">
      <ul
        class="
          sm:grid sm:grid-cols-2
          gap-3
          sm:w-1/3 sm:mr-8 sm:h-64
          mb-4
          sm:mb-0
        "
      >
        <application-user-profile-card v-if="user" :user="user" />
        <li
          v-else
          class="
            col-span-2
            flex
            sm:flex-col
            justify-center
            text-center
            bg-white
            rounded-lg
            shadow
          "
        >
          <nuxt-link :to="localePath('/antraege/erstellen')">
            <chip chip-class="text-gray-600"
              ><outline-plus-icon class="w-5 h-5 text-purple-500 block" />
              {{ $t('goto.createProposal') }}</chip
            >
          </nuxt-link>
        </li>
      </ul>
      <application-grid
        :projects="projects"
        :current-page="currentPage"
        :total-pages="totalPages"
        @changePage="changePage"
      ></application-grid>
    </div>
  </layouts-header-title>
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
import { useAxios } from '~/composables/useAxios'
import { RootState } from '~/store'
import { IProject } from '~/types/apiSchema'

export default defineComponent({
  name: 'ApplicationsPage',
  setup() {
    const projects = ref<IProject[]>([])
    const store = useStore<RootState>()
    const axios = useAxios()
    const user = computed(() => store.state.auth.user)
    const currentPage = ref(1)
    const totalPages = ref(1)
    const itemsPerPage = ref(15)
    const changePage = (page: number) => {
      currentPage.value = page
      fetchUserProjects()
    }

    watch(
      () => currentPage.value,
      () => {
        fetchUserProjects()
      }
    )

    const fetchUserProjects = async () => {
      if (store.state.auth.user)
        try {
          const createdProjectsIds: number[] =
            store.state.auth.user.createdProjects.map(
              (project: IProject) => project.id
            )
          const response = await axios.get(
            `/projects?page=${currentPage.value}`,
            {
              params: { id: createdProjectsIds },
            }
          )
          projects.value = response.data['hydra:member']
          totalPages.value = Math.ceil(
            response.data['hydra:totalItems'] / itemsPerPage.value
          )
        } catch (e) {
          console.log(e)
        }
    }

    fetchUserProjects()
    return { projects, user, parseISO, currentPage, changePage, totalPages }
  },
})
</script>
