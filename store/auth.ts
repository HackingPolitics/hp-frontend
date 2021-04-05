import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { getStoredAuthToken, storeAuthToken } from '@/utils/authToken'

export const state = () => ({
  user: null,
  isLoading: false,
  errors: false,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  isLoggedIn: (state) => {
    return !!state.user
  },
}

export const mutations: MutationTree<RootState> = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_LOADING_FLAG(state, flag: boolean) {
    state.isLoading = flag
  },
  SET_ERRORS(state, flag: boolean) {
    state.errors = flag
  },
}

export interface LoginCredentials {
  username: string
  password: string
}

export const actions: ActionTree<RootState, RootState> = {
  // login
  async login({ commit }, loginData: LoginCredentials) {
    commit('SET_ERRORS', false)
    commit('SET_LOADING_FLAG', true)
    try {
      const response = await this.$api.auth.requestAuthToken(loginData)
      commit('SET_USER', response.user)
      //   storeAuthToken(response.access_token)
      //   this.$axios.setToken(response.access_token, 'Bearer')
      //   this.$router.push('/')
      console.log(response)
      commit('SET_LOADING_FLAG', false)
    } catch (error) {
      commit('SET_ERRORS', error.response?.data?.errorDetails?.errorMessage)
      commit('SET_LOADING_FLAG', false)
      return error
    }
  },

  // logout
  logout({ commit }) {
    localStorage.removeItem('auth_token')
    commit('SET_USER', null)
    this.$router.push('/login')
  },

  // request password reset
  async requestPasswordReset({ commit }, email) {
    try {
      await this.$axios.$post(`/auth/forgot`, { email })
      return 'Reset requested'
    } catch {
      commit('SET_ERRORS', true)
    }
  },

  // register with email and password
  async register({ commit }, credentials) {
    try {
      const response = await this.$api.auth.registerUser(credentials)
      console.log(response)
      commit('SET_LOADING_FLAG', false)
      return response
    } catch (e) {
      // this.error = e.response.data.message
      console.log(e)
    }
  },

  clearUser({ commit }) {
    commit('SET_USER', null)
  },

  // refresh token
  async refreshToken({ commit }) {
    commit('SET_ERRORS', false)
    commit('SET_LOADING_FLAG', true)
    try {
      const response = await this.$axios.$post(`/auth/refresh`)
      commit('SET_USER', response.user)
      localStorage.removeItem('auth_token')
      localStorage.setItem('auth_token', response.access_token)
      this.$axios.setToken(response.access_token, 'Bearer')
      commit('SET_LOADING_FLAG', false)
      return response
    } catch (error) {
      localStorage.removeItem('auth_token')
      commit('SET_USER', null)
      this.$router.push('/login')
      commit('SET_ERRORS', true)
      commit('SET_LOADING_FLAG', false)
      //   Vue.notify({
      //     group: 'error',
      //     text: 'Session abgelaufen',
      //     data: {
      //       subText: 'Deine Session ist abgelaufen. Bitte logge dich neu ein.'
      //     }
      //   })
      return error
    }
  },

  // confirm email address
  async confirmEmailAddress(_, token) {
    try {
      await this.$axios.$post(`/auth/confirm/${token}`, {})
      return true
    } catch (error) {
      return error
    }
  },
}
