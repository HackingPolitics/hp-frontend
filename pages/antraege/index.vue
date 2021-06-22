<template>
  <layouts-single-view :title="$t('page.myproposals.title')">
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
      <application-grid :projects="projects"></application-grid>
    </div>
  </layouts-single-view>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  computed,
  ref,
} from '@nuxtjs/composition-api'
import { parseISO } from 'date-fns'
import { RootState } from '~/store'
import { IProject } from '~/types/apiSchema'

export default defineComponent({
  name: 'ApplicationsPage',
  setup() {
    const projects = ref<IProject[]>([])
    const store = useStore<RootState>()
    const user = computed(() => store.state.auth.user)
    return { projects, user, parseISO }
  },
  async fetch() {
    if (this.$store.state.auth.user)
      try {
        const createdProjectsIds: number[] =
          this.$store.state.auth.user.createdProjects.map(
            (project: IProject) => project.id
          )
        const response = await this.$axios.get('/projects', {
          params: { id: createdProjectsIds },
        })
        this.projects = response.data['hydra:member']
      } catch (e) {
        console.log(e)
      }
  },
})
</script>
