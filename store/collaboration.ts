import { MutationTree } from 'vuex'
import { AwarenessState, StateUser } from '~/types/collaborations'

export interface CollaborationState {
  awarenessStates: AwarenessState[]
  currentArea: string | null
  onlineUsers: StateUser[] | null
  lockedField: string | null
  lockedFields: any
  lockedSince: number | null
  projectSaved: number | null
  recentProjectSaved: number | null
}

const defaultProjectsState: CollaborationState = {
  awarenessStates: [],
  currentArea: null,
  onlineUsers: null,
  lockedField: null,
  lockedFields: null,
  lockedSince: null,
  projectSaved: null,
  recentProjectSaved: null,
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
  SET_LOCKED_FIELD(state, val) {
    state.lockedField = val
  },
  SET_LOCKED_FIELDS(state, val) {
    state.lockedFields = val
  },
  SET_LOCKED_SINCE(state, date) {
    state.lockedSince = date
  },
  SET_PROJECT_SAVED(state, date) {
    state.projectSaved = date
  },
  SET_RECENT_PROJECT_SAVED(state, date) {
    state.recentProjectSaved = date
  },
}
