<template>
  <div class="bg-gray-200 min-h-screen flex flex-col justify-between">
    <div class="flex-1">
      <main-nav></main-nav>
      <main
        class="
          max-w-screen-xl
          mx-auto
          pb-10
          lg:py-12 lg:px-8
          flex-1
          overflow-scroll
          w-full
        "
      >
        <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <admin-sidebar></admin-sidebar>
          <nuxt />
        </div>
      </main>
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
  name: 'AdminLayout',
  setup() {
    const context = useContext()
    const axios = useAxios()

    const fetchUser = async () => {
      // @ts-ignore
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
    }

    fetchUser()

    return {}
  },
})
</script>
