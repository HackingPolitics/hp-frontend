export interface StateUser {
  name: string | null
  area: string | null
  id: string | number
  lockedField: string | null
  lockedSince: Date | null
  projectSaved: Date | null
}

export interface AwarenessState {
  clientId: string
  user: StateUser
}
