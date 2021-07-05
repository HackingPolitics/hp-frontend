import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { set } from 'lodash'
import { IProject, IProjectMembership } from '~/types/apiSchema'

export interface ProjectsState {
  project: IProject
  createdProject: IProject | null
  createdProjectMembership: IProjectMembership | null
  isLoading: false
  error: string | null
}

const defaultProjectsState: ProjectsState = {
  project: {},
  createdProject: null,
  createdProjectMembership: null,
  isLoading: false,
  error: null,
}

export const state = () => ({
  ...defaultProjectsState,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  canEditProject: (_, __, rootState) => (projectId: number) => {
    // @ts-ignore
    if (rootState.auth?.user?.projectMemberships) {
      // @ts-ignore
      const check = rootState.auth.user.projectMemberships.find(
        (el: IProject) => el.project.id === projectId
      )

      return !!check
    }
    return false
  },
}

export const mutations: MutationTree<RootState> = {
  SET_PROJECT(state, project) {
    state.project = project
  },
  SET_CREATED_PROJECT_MEMBERSHIP(state, projectMembership) {
    state.createdProjectMembership = projectMembership
  },

  SET_CREATED_PROJECT(state, project) {
    state.createdProject = project
  },

  SET_PROJECT_PROPERTY(state, [property, value]) {
    set(state.project, property, value)
  },

  SET_LOADING_FLAG(state, flag) {
    state.isLoading = flag
  },

  SET_ERROR(state, error) {
    state.error = error
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async createProject({ commit, rootState }, data) {
    try {
      const response = await this.$api.projects.createProject(data)
      // refetch user data if user is loggedIn
      // @ts-ignore
      if (rootState.auth.user) {
        // reload user data
        try {
          // @ts-ignore
          const user = await this.$axios.get(`/users/${rootState.auth.user.id}`)
          this.$auth.setUser(user.data)
        } catch (error) {
          console.log(error)
        }
      }
      // @ts-ignore
      // this.$notify({ title: 'Projekt erstellt', duration: 10000 })
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
  async fetchProject({ commit }, id) {
    commit('SET_ERROR', null)
    commit('SET_LOADING_FLAG', true)
    try {
      const response = await this.$api.projects.fetchProject(id)
      commit('SET_LOADING_FLAG', false)
      commit('SET_PROJECT', response.data)
    } catch (e) {
      console.log(e.response.data)
      commit('SET_LOADING_FLAG', false)
      commit('SET_ERROR', e.response.data)
    }
  },

  setProject({ commit }, payload) {
    commit('SET_PROJECT', payload)
  },
  async fetchProjects({ commit }) {
    commit('SET_LOADING_FLAG', true)
    try {
      const response = await this.$api.projects.fetchProjects()
      commit('SET_LOADING_FLAG', false)
      return response.data['hydra:member']
    } catch (e) {
      commit('SET_LOADING_FLAG', false)
      commit('SET_ERROR', e.response.data)
    }
  },
  async applyForProject(_, membership) {
    try {
      const response = await this.$api.projectMemberships
        .create(membership)
        .then(() => {
          // @ts-ignore
          this.$notify({
            title: 'Bewerbung wurde verschickt',
            duration: 500,
          })
        })
      return response
    } catch (e) {
      // this.error = e.response.data.message
      console.log(e)
    }
  },
  async updateProjectMemberShip(_, [id, data]) {
    try {
      const response = await this.$api.projectMemberships
        .update(id, data)
        .then(() => {
          // @ts-ignore
          this.$notify({
            title: 'Bewerbung angenommen',
            duration: 500,
          })
        })
      return response
    } catch (e) {
      // this.error = e.response.data.message
      console.log(e)
    }
  },
  async deleteProjectMemberShip(_, id) {
    try {
      const response = await this.$api.projectMemberships
        .delete(id)
        .then(() => {
          // @ts-ignore
          this.$notify({
            title: 'Mitgliedschaft gelöscht',
            duration: 500,
          })
        })
      return response
    } catch (e) {
      // this.error = e.response.data.message
      console.log(e)
    }
  },
}
