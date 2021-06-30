import { ref, useContext } from '@nuxtjs/composition-api'
import { ICategory } from '~/types/apiSchema'

const categories = ref<ICategory[] | null>(null)
const isLoading = ref(false)
const error = ref(null)

const useCategory = () => {
  // @ts-ignore
  const { $axios, $api } = useContext()

  if (!$axios) {
    // throw error, no store provided
    throw new Error('nuxt axios is not defined!')
  }

  const fetchCategories = async () => {
    isLoading.value = true
    try {
      const response = await $api.category.fetchCategories()
      console.log(response)
      const data = response.data['hydra:member']
      const categoryOptions = data
        ? data.map((e: ICategory) => {
            return {
              label: e.name,
              value: e['@id'],
            }
          })
        : []
      categories.value = categoryOptions
      isLoading.value = false
    } catch (e) {
      console.log(e)
      isLoading.value = false
      error.value = e.response.data.message
    }
  }

  fetchCategories()

  return {
    categories,
    isLoading,
  }
}

export default useCategory
