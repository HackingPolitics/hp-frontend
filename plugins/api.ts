// plugins/api.js
import { Plugin } from '@nuxt/types'

import Auth from '@/api/auth'
import User from '@/api/user'
import Projects from '@/api/project'
import ProjectMemberships from '@/api/project_memberships'
import Arguments from '@/api/arguments'
import CounterArguments from '@/api/counter_arguments'
import Negations from '@/api/negations'

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
    projects: Projects(context.$axios),
    projectMemberships: ProjectMemberships(context.$axios),
    arguments: Arguments(context.$axios),
    counter_arguments: CounterArguments(context.$axios),
    negations: Negations(context.$axios),
  }

  // Inject $api
  inject('api', factories)
}

export default apiPlugin
