export interface StateUser {
  username: string | null
  firstname: string | null
  lastName: string | null
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
