export interface StateUser {
  name: string | null
  area: string | null
  id: string | number
  lockedField: string | null
  lockedSince: number | null
  projectSaved: number | null
}

export interface AwarenessState {
  clientId: string
  user: StateUser
}
