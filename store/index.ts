import { AuthState } from './auth'
import { ProjectsState } from '~/store/projects'

export const state = () => ({})

export interface RootState {
  auth: AuthState
  projects: ProjectsState
}
