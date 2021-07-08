import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { ICategory, IHydraCollection } from '~/types/apiSchema'

export interface CategoriesState {
  categories: IHydraCollection<ICategory> | null
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
      return state.categories?.['hydra:member']?.map((category: ICategory) => {
        return { value: category['@id'], label: category.name }
      })
    }
    return []
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchCategories({ commit }, page = 1) {
    commit('SET_ERROR', null)
    commit('SET_LOADING_FLAG', true)
    commit('SET_CATEGORIES', null)
    try {
      const response = await this.$axios.get(`/categories?page=${page}`)
      commit('SET_LOADING_FLAG', false)
      commit('SET_CATEGORIES', response.data)
      return response.data['hydra:member']
    } catch (e) {
      commit('SET_LOADING_FLAG', false)
      commit('SET_ERROR', e.response.data)
    }
  },

  async createCategory({ commit }, payload) {
    commit('SET_ERROR', null)
    commit('SET_LOADING_FLAG', true)
    try {
      await this.$axios.post('/categories', payload)
      commit('SET_LOADING_FLAG', false)
      // @ts-ignore
      this.$notify({
        title: 'Kategorie erstellt',
        duration: 300,
        type: 'success',
      })
    } catch (e) {
      // @ts-ignore
      this.$notify({
        title: 'Kategorie konnte nicht erstellt werden',
        duration: 300,
        type: 'error',
      })
      commit('SET_LOADING_FLAG', false)
      commit('SET_ERROR', e.response.data)
    }
  },

  async updateCategory({ commit }, { id, payload }) {
    commit('SET_ERROR', null)
    commit('SET_LOADING_FLAG', true)
    try {
      await this.$axios.put(`/categories/${id}`, payload)
      commit('SET_LOADING_FLAG', false)
      // @ts-ignore
      this.$notify({
        title: 'Kategorie geändert',
        duration: 300,
        type: 'success',
      })
    } catch (e) {
      // @ts-ignore
      this.$notify({
        title: 'Kategorie konnte nicht geändert werden',
        duration: 300,
        type: 'warn',
      })
      commit('SET_LOADING_FLAG', false)
      commit('SET_ERROR', e.response.data)
    }
  },

  async deleteCategory(_, id) {
    try {
      await this.$axios.delete(`/categories/${id}`)
      // @ts-ignore
      this.$notify({
        title: 'Kategorie gelöscht',
        duration: 300,
        type: 'success',
      })
    } catch (e) {
      // @ts-ignore
      this.$notify({
        title: 'Kategorie konnte nicht gelöscht werden',
        duration: 300,
        type: 'error',
      })
    }
  },
}
