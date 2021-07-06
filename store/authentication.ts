import { ActionTree, MutationTree } from 'vuex'
import { JwtPayload } from 'jwt-decode'
import { IErrors } from '~/types/apiSchema'

export interface AuthState {
  isLoading: boolean
  errors: IErrors | null
  passwordResetRequestSuccess: boolean
}

const defaultAuthState: AuthState = {
  isLoading: false,
  errors: null,
  passwordResetRequestSuccess: false,
}

export const state = () => ({
  ...defaultAuthState,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_LOADING_FLAG(state, flag: boolean) {
    state.isLoading = flag
  },
  SET_ERRORS(state, flag: IErrors) {
    state.errors = flag
  },
  SET_REQ_PW_RESET_SUCCESS(state, flag: boolean) {
    state.passwordResetRequestSuccess = flag
  },
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface JwtPayloadWithUser extends JwtPayload {
  editableProjects: number[]
  exp: number
  iat: number
  id: number
  roles: string[]
  username: string
}

export const actions: ActionTree<RootState, RootState> = {
  // request password reset
  async resetPassword({ commit }, payload) {
    try {
      commit('SET_LOADING_FLAG', true)
      const response = await this.$api.auth.passwordReset(payload)
      commit('SET_LOADING_FLAG', false)
      return response
    } catch {
      commit('SET_ERRORS', true)
      commit('SET_LOADING_FLAG', false)
      return {
        success: false,
      }
    }
  },

  // Request Password Reset
  async passwordResetRequest({ commit }, data) {
    try {
      commit('SET_LOADING_FLAG', true)
      const response = await this.$api.auth.passwordResetRequest(data)
      commit('SET_LOADING_FLAG', false)
      commit('SET_REQ_PW_RESET_SUCCESS', true)
      return response
    } catch (error) {
      commit('SET_LOADING_FLAG', false)
      commit('SET_ERRORS', true)
      commit('SET_REQ_PW_RESET_SUCCESS', false)
      return error
    }
  },

  // register with email and password
  async register({ commit }, credentials) {
    commit('SET_LOADING_FLAG', true)
    try {
      const response = await this.$api.auth.registerUser(credentials)
      commit('SET_LOADING_FLAG', false)
      return response
    } catch (error) {
      commit('SET_LOADING_FLAG', false)
      commit('SET_ERRORS', error.response.data)
      return error
    }
  },

  // Confirm E-mail Address
  async confirmEmailAddress({ commit }, data) {
    try {
      commit('SET_LOADING_FLAG', true)
      const response = await this.$axios.post(
        `/validations/${data.id}/confirm`,
        {
          token: data.token,
        }
      )
      commit('SET_LOADING_FLAG', false)
      console.log(response)
      return response
    } catch (error) {
      commit('SET_LOADING_FLAG', false)
      commit('SET_ERRORS', error.response)
      return error
    }
  },
}
