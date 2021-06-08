<template>
  <layouts-single-view
    title="Stadtratsanträge in deiner Region und der ganzen Republik"
  >
    <h2 class="font-semibold text-3xl mt-16">
      {{ projects.length }} Anträge in Dresden
    </h2>
    <application-grid
      :cols="3"
      class="mt-8"
      :projects="projects"
    ></application-grid>
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
    try {
      const response = await this.$axios.get('/projects')
      this.projects = response.data['hydra:member']
    } catch (e) {
      console.log(e)
    }
  },
})
</script>
