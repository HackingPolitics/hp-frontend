<template>
  <div class="min-h-screen bg-gray-200 flex flex-col justify-between">
    <div class="flex-1 overflow-y-auto relative">
      <loading-indicator
        v-if="isLoading"
        class="layout-loading-indicator"
      ></loading-indicator>
      <Nuxt v-else />
    </div>
    <base-footer></base-footer>
    <notification-toast />
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, ref } from '@nuxtjs/composition-api'
import jwtDecode from 'jwt-decode'
import { useAxios } from '~/composables/useAxios'
import { JwtPayloadWithUser } from '~/store/authentication'

export default defineComponent({
  setup() {
    const context = useContext()
    const axios = useAxios()

    const isLoading = ref(false)

    const fetchUser = async () => {
      // @ts-ignore
      isLoading.value = true
      const token = context.$auth.strategy.token.get()

      if (token) {
        try {
          const decoded = jwtDecode<JwtPayloadWithUser>(token)
          const user = await axios.get(`/users/${decoded.id}`)
          context.$auth.setUser(user.data)
        } catch (error) {
          console.log(error)
        }
      }
      isLoading.value = false
    }

    fetchUser()

    return { isLoading }
  },
})
</script>
