import { ActionTree, MutationTree } from 'vuex'
import { IProject } from '~/types/apiSchema'

export interface ProjectsState {
  project: IProject | null
  createdProject: IProject | null
  isLoading: false
  error: string | null
}

const defaultProjectsState: ProjectsState = {
  project: null,
  createdProject: null,
  isLoading: false,
  error: null,
}

export const state = () => ({
  ...defaultProjectsState,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_PROJECT(state, project) {
    state.project = project
  },
  SET_CREATED_PROJECT(state, project) {
    state.createdProject = project
  },

  SET_LOADING_FLAG(state, flag) {
    state.isLoading = flag
  },

  SET_ERROR(state, error) {
    state.error = error
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async createProject({ commit }, data) {
    try {
      const response = await this.$api.projects.createProject(data)
      // @ts-ignore
      // this.$notify({ title: 'Projekt erstellt', duration: 10000 })
      commit('SET_CREATED_PROJECT', null)
      return response
    } catch (e) {
      // this.error = e.response.data.message
      console.log(e)
    }
  },

  async fetchProjects({ commit }) {
    commit('SET_LOADING_FLAG', true)
    try {
      const response = await this.$api.projects.fetchProjects()
      commit('SET_LOADING_FLAG', false)
      return response.data['hydra:member']
    } catch (e) {
      commit('SET_LOADING_FLAG', false)
      commit('SET_ERROR', e.response.data.message)
    }
  },
}
