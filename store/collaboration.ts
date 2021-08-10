import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { set } from 'lodash'

export interface CollaborationState {
  awarenessStates: null
  currentArea: null
  onlineUsers: null
}

const defaultProjectsState: CollaborationState = {
  awarenessStates: null,
  currentArea: null,
  onlineUsers: null,
}

export const state = () => ({
  ...defaultProjectsState,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_CURRENT_AREA(state, area) {
    state.currentArea = area
  },
  SET_ONLINE_USERS(state, users) {
    state.onlineUsers = users
  },
  SET_AWARENESS_STATES(state, val) {
    state.awarenessStates = val
  },
}