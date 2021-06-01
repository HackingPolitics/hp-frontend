import { ActionTree, MutationTree } from 'vuex'
import { IProject } from '~/types/apiSchema'

export interface ProjectsState {
  project: IProject | null
  createdProject: IProject | null
}

const defaultProjectsState: ProjectsState = {
  project: null,
  createdProject: null,
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
}

export const actions: ActionTree<RootState, RootState> = {
  async createProject({ commit }, data) {
    try {
      const response = await this.$api.projects.createProject(data)
      // @ts-ignore
      this.$notify({ title: 'Projekt erstellt', duration: 10000 })
      commit('SET_CREATED_PROJECT', null)
      return response
    } catch (e) {
      // this.error = e.response.data.message
      console.log(e)
    }
  },
  async updateProject({ commit }, [id, data]) {
    try {
      const response = await this.$api.projects.updateProject(id, data)
      // @ts-ignore
      this.$notify({ title: 'Änderungen gespeichert', duration: 500 })
      commit('SET_PROJECT', response.data)
      return response
    } catch (e) {
      // this.error = e.response.data.message
      console.log(e)
    }
  },
}
