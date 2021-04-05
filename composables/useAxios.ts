import { useContext } from '@nuxtjs/composition-api'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export function useAxios(): NuxtAxiosInstance {
  const { $axios } = useContext()

  if (!$axios) {
    // throw error, no store provided
    throw new Error('nuxt axios is not defined!')
  }
  return $axios
}
