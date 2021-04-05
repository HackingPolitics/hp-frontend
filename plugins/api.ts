// plugins/api.js
import { Plugin } from '@nuxt/types'

import Auth from '@/api/auth'
import User from '@/api/user'

declare module 'vuex/types/index' {
  // this.$api inside Vuex stores
  interface Store<S> {
    $api: any
  }
}

const apiPlugin: Plugin = (context, inject) => {
  // Initialize API factories
  const factories = {
    auth: Auth(context.$axios),
    user: User(context.$axios),
  }

  // Inject $api
  inject('api', factories)
}

export default apiPlugin
