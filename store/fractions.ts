import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { IFraction, IHydraCollection } from '~/types/apiSchema'

export interface FractionsState {
  fractions: IHydraCollection<IFraction> | null
  isLoading: false
  error: string | null
}

const defaultFractionsState: FractionsState = {
  fractions: null,
  isLoading: false,
  error: null,
}

export const state = () => ({
  ...defaultFractionsState,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_FRACTIONS(state, fractions) {
    state.fractions = fractions
  },
  SET_LOADING_FLAG(state, flag) {
    state.isLoading = flag
  },

  SET_ERROR(state, error) {
    state.error = error
  },
}

export const getters: GetterTree<RootState, RootState> = {
  categoryOptions: (state) => {
    if (state.fractions) {
      return state.fractions?.['hydra:member']?.map((fraction: IFraction) => {
        return { value: fraction['@id'], label: fraction.name }
      })
    }
    return []
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchFractions({ commit }, page = 1) {
    commit('SET_ERROR', null)
    commit('SET_LOADING_FLAG', true)
    commit('SET_FRACTIONS', null)
    try {
      const response = await this.$axios.get(`/councils?page=${page}`)
      commit('SET_LOADING_FLAG', false)
      commit('SET_FRACTIONS', response.data)
      return response.data['hydra:member']
    } catch (e) {
      commit('SET_LOADING_FLAG', false)
      commit('SET_ERROR', e.response.data)
    }
  },

  async createFractions({ commit }, payload) {
    commit('SET_ERROR', null)
    commit('SET_LOADING_FLAG', true)
    try {
      await this.$axios.post('/fraction', payload)
      commit('SET_LOADING_FLAG', false)
      // @ts-ignore
      this.$notify({
        title: 'Fraktion erstellt',
        duration: 300,
        type: 'success',
      })
    } catch (e) {
      // @ts-ignore
      this.$notify({
        title: 'Fraktion konnte nicht erstellt werden',
        duration: 300,
        type: 'error',
      })
      commit('SET_LOADING_FLAG', false)
      commit('SET_ERROR', e.response.data)
    }
  },

  async updateFraction({ commit }, { id, payload }) {
    commit('SET_ERROR', null)
    commit('SET_LOADING_FLAG', true)
    try {
      await this.$axios.put(`/fractions/${id}`, payload)
      commit('SET_LOADING_FLAG', false)
      // @ts-ignore
      this.$notify({
        title: 'Fraktion geändert',
        duration: 300,
        type: 'success',
      })
    } catch (e) {
      // @ts-ignore
      this.$notify({
        title: 'Fraktion konnte nicht geändert werden',
        duration: 300,
        type: 'warn',
      })
      commit('SET_LOADING_FLAG', false)
      commit('SET_ERROR', e.response.data)
    }
  },

  async deleteFraction(_, id) {
    try {
      await this.$axios.delete(`/fractions/${id}`)
      // @ts-ignore
      this.$notify({
        title: 'Fraktion gelöscht',
        duration: 300,
        type: 'success',
      })
    } catch (e) {
      // @ts-ignore
      this.$notify({
        title: 'Fraktion konnte nicht gelöscht werden',
        duration: 300,
        type: 'error',
      })
    }
  },
}
