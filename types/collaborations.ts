export interface StateUser {
  name: string | null
  area: string | null
  id: string | number
}

export interface AwarenessState {
  clientId: string
  user: StateUser
}
