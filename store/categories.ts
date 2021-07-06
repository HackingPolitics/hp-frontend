import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { ICategory } from '~/types/apiSchema'

export interface CategoriesState {
  categories: ICategory | null
  isLoading: false
  error: string | null
}

const defaultCategoriesState: CategoriesState = {
  categories: null,
  isLoading: false,
  error: null,
}

export const state = () => ({
  ...defaultCategoriesState,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
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
    if (state.categories) {
      return state.categories.map((category: ICategory) => {
        return { value: category['@id'], label: category.name }
      })
    }
    return []
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchCategories({ commit }) {
    commit('SET_LOADING_FLAG', true)
    try {
      console.log(this)
      const response = await this.$axios.get('/categories')
      commit('SET_LOADING_FLAG', false)
      commit('SET_CATEGORIES', response.data['hydra:member'])
      console.log(response)
      return response.data['hydra:member']
    } catch (e) {
      console.log(e)
      commit('SET_LOADING_FLAG', false)
      commit('SET_ERROR', e.response.data)
    }
  },
}
