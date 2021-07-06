import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { IHydraCollection, IParliament } from '~/types/apiSchema'

export interface CouncilState {
  councils: IHydraCollection<IParliament> | null
  council: IParliament | null
  isLoading: false
  error: string | null
}

const defaultCouncilsState: CouncilState = {
  councils: null,
  council: null,
  isLoading: false,
  error: null,
}

export const state = () => ({
  ...defaultCouncilsState,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_COUNCILS(state, councils) {
    state.councils = councils
  },
  SET_COUNCIL(state, council) {
    state.council = council
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
    if (state.councils) {
      return state.councils?.['hydra:member']?.map((council: IParliament) => {
        return { value: council['@id'], label: council.name }
      })
    }
    return []
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchCouncils({ commit }, page = 1) {
    commit('SET_ERROR', null)
    commit('SET_LOADING_FLAG', true)
    commit('SET_COUNCILS', null)
    try {
      const response = await this.$axios.get(`/councils?page=${page}`)
      commit('SET_LOADING_FLAG', false)
      commit('SET_COUNCILS', response.data)
      return response.data['hydra:member']
    } catch (e) {
      commit('SET_LOADING_FLAG', false)
      commit('SET_ERROR', e.response.data)
    }
  },

  async getCouncilById({ commit }, id) {
    commit('SET_ERROR', null)
    commit('SET_LOADING_FLAG', true)
    commit('SET_COUNCIL', null)
    try {
      console.log(id)
      const response = await this.$axios.get(`/councils/${id}`)

      commit('SET_LOADING_FLAG', false)
      commit('SET_COUNCIL', response.data)
      return response.data
    } catch (e) {
      commit('SET_LOADING_FLAG', false)
      commit('SET_ERROR', e.response.data)
    }
  },

  async createCouncil({ commit }, payload) {
    commit('SET_ERROR', null)
    commit('SET_LOADING_FLAG', true)
    try {
      await this.$axios.post('/councils', payload)
      commit('SET_LOADING_FLAG', false)
      // @ts-ignore
      this.$notify({
        title: 'Parlament erstellt',
        duration: 300,
        type: 'success',
      })
    } catch (e) {
      // @ts-ignore
      this.$notify({
        title: 'Parlament konnte nicht erstellt werden',
        duration: 300,
        type: 'error',
      })
      commit('SET_LOADING_FLAG', false)
      commit('SET_ERROR', e.response.data)
    }
  },

  async updateCouncil({ commit }, { id, payload }) {
    commit('SET_ERROR', null)
    commit('SET_LOADING_FLAG', true)
    try {
      await this.$axios.put(`/councils/${id}`, payload)
      commit('SET_LOADING_FLAG', false)
      // @ts-ignore
      this.$notify({
        title: 'Parlament geändert',
        duration: 300,
        type: 'success',
      })
    } catch (e) {
      // @ts-ignore
      this.$notify({
        title: 'Parlament konnte nicht geändert werden',
        duration: 300,
        type: 'warn',
      })
      commit('SET_LOADING_FLAG', false)
      commit('SET_ERROR', e.response.data)
    }
  },

  async deleteCouncil(_, id) {
    try {
      await this.$axios.delete(`/councils/${id}`)
      // @ts-ignore
      this.$notify({
        title: 'Parlament gelöscht',
        duration: 300,
        type: 'success',
      })
    } catch (e) {
      // @ts-ignore
      this.$notify({
        title: 'Parlament konnte nicht gelöscht werden',
        duration: 300,
        type: 'error',
      })
    }
  },
}
