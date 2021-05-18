import { ActionTree, MutationTree } from 'vuex'
import { IProject } from '~/types/apiSchema'

export interface ProjectsState {
  project: IProject | null
}

const defaultProjectsState: ProjectsState = {
  project: null,
}

export const state = () => ({
  ...defaultProjectsState,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_PROJECT(state, project) {
    state.project = project
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async createProject({ commit }, credentials) {
    try {
      const response = await this.$api.project.createProject(credentials)
      commit('SET_PROJECT', response)
      return response
    } catch (e) {
      // this.error = e.response.data.message
      console.log(e)
    }
  },
}
