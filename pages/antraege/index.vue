<template>
  <layouts-header-title :title="$t('page.myproposals.title')">
    <div class="sm:flex mt-4 w-full">
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
      <div class="flex flex-col space-y-8">
        <div v-if="appliedProjects && appliedProjects.length">
          <h2 class="text-xl font-bold text-gray-900 sm:text-2xl mb-8">
            {{ $t('page.myproposals.openApplication') }}
          </h2>
          <application-grid
            :projects="appliedProjects"
            :current-page="currentAppliedApplicationPage"
            :total-pages="totalAppliedApplicationPages"
            :is-loading="isLoading"
            @changePage="changeAppliedApplicationPage"
          ></application-grid>
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 sm:text-2xl mb-8">
            {{ $t('page.myproposals.myProjects') }}
          </h2>
          <application-grid
            :projects="projects"
            :current-page="currentPage"
            :total-pages="totalPages"
            :is-loading="isLoading"
            @changePage="changePage"
          ></application-grid>
        </div>
      </div>
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
import { IProject, IProjectMembership } from '~/types/apiSchema'

export default defineComponent({
  name: 'ApplicationsPage',
  setup() {
    const projects = ref<IProject[]>([])
    const appliedProjects = ref<IProject[]>([])
    const store = useStore<RootState>()
    const axios = useAxios()
    const user = computed(() => store.state.auth.user)
    const currentPage = ref(1)
    const totalPages = ref(1)
    const currentAppliedApplicationPage = ref(1)
    const totalAppliedApplicationPages = ref(1)
    const itemsPerPage = ref(15)

    const changePage = (page: number) => {
      currentPage.value = page
      fetchUserProjects()
    }

    const changeAppliedApplicationPage = (page: number) => {
      currentAppliedApplicationPage.value = page
      fetchUserProjects()
    }

    const createdProjectsIds = computed(() => {
      return store.state.auth?.user?.projectMemberships
        ?.filter(
          (membership: IProjectMembership) => membership.role !== 'applicant'
        )
        .map((e: IProjectMembership) => e?.project?.id)
    })

    const appliedProjectIds = computed(() => {
      return store.state.auth?.user?.projectMemberships
        ?.filter(
          (membership: IProjectMembership) => membership.role === 'applicant'
        )
        .map((e: IProjectMembership) => e?.project?.id)
    })

    const isLoading = ref(true)

    watch(
      () => currentPage.value,
      () => {
        fetchUserProjects()
      }
    )

    watch(
      () => user.value,
      () => {
        fetchUserProjects()
      }
    )

    const fetchUserProjects = async () => {
      if (store.state.auth.user) {
        isLoading.value = true
        try {
          const createdProjectsRes = await axios.get(
            `/projects?page=${currentPage.value}`,
            {
              params: { id: createdProjectsIds.value },
            }
          )
          if (appliedProjectIds.value.length) {
            const appliedProjectsRes = await axios.get(
              `/projects?page=${currentAppliedApplicationPage.value}`,
              {
                params: { id: appliedProjectIds.value },
              }
            )
            appliedProjects.value = appliedProjectsRes.data['hydra:member']
            totalAppliedApplicationPages.value = Math.ceil(
              appliedProjectsRes.data['hydra:totalItems'] / itemsPerPage.value
            )
          }
          projects.value = createdProjectsRes.data['hydra:member']

          totalPages.value = Math.ceil(
            createdProjectsRes.data['hydra:totalItems'] / itemsPerPage.value
          )
          isLoading.value = false
        } catch (e) {
          isLoading.value = false
          console.log(e)
        }
      }
    }

    fetchUserProjects()
    return {
      projects,
      appliedProjects,
      user,
      parseISO,
      currentPage,
      changePage,
      changeAppliedApplicationPage,
      totalPages,
      createdProjectsIds,
      appliedProjectIds,
      isLoading,
      currentAppliedApplicationPage,
      totalAppliedApplicationPages,
    }
  },
})
</script>
