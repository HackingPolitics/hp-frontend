import { ref, useContext } from '@nuxtjs/composition-api'
import { IProject } from '~/types/apiSchema'

const useProject = (id: string) => {
  // @ts-ignore
  const { $axios, $api } = useContext()

  const project = ref<IProject | null>(null)
  const isLoading = ref(false)
  const error = ref(null)

  if (!$axios) {
    // throw error, no store provided
    throw new Error('nuxt axios is not defined!')
  }

  const fetchProject = async (id: string) => {
    isLoading.value = true
    try {
      const response = await $api.projects.fetchProject(id)
      project.value = response.data
      isLoading.value = false
    } catch (e) {
      isLoading.value = false
      error.value = e.response.data.message
    }
  }

  fetchProject(id)

  return {
    project,
    fetchProject,
    isLoading,
  }
}

export default useProject
