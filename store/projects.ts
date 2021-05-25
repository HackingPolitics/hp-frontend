import { ActionTree, MutationTree } from 'vuex'
import { IProject } from '~/types/apiSchema'

export interface ProjectsState {
  project: IProject | null
  createdProjects: IProject[] | null
}

const defaultProjectsState: ProjectsState = {
  project: null,
  createdProjects: null,
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
    state.createdProjects = project
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async createProject({ commit }, credentials) {
    try {
      const response = await this.$api.projects.createProject(credentials)
      commit('SET_PROJECT', response)
      commit('SET_CREATED_PROJECT', null)
      return response
    } catch (e) {
      // this.error = e.response.data.message
      console.log(e)
    }
  },
}
