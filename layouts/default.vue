<template>
  <div class="min-h-screen bg-gray-200 flex flex-col justify-between">
    <div class="flex-1 overflow-scroll relative">
      <Nuxt />
    </div>
    <base-footer></base-footer>
    <notification-toast />
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import jwtDecode from 'jwt-decode'
import { useAxios } from '~/composables/useAxios'
import { JwtPayloadWithUser } from '~/store/authentication'

export default defineComponent({
  setup() {
    const context = useContext()
    const axios = useAxios()

    const fetchUser = async () => {
      // @ts-ignore
      const token = context.$auth.strategy.token.get()

      const decoded = jwtDecode<JwtPayloadWithUser>(token)
      if (token) {
        try {
          const user = await axios.get(`/users/${decoded.id}`)
          context.$auth.setUser(user.data)
        } catch (error) {
          console.log(error)
        }
      }
    }

    fetchUser()

    return {}
  },
})
</script>
