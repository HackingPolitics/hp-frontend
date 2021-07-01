import { AuthState } from './auth_old'
import { ProjectsState } from '~/store/projects'
import { CategoriesState } from '~/store/categories'

export const state = () => ({})

export interface RootState {
  auth: AuthState
  projects: ProjectsState
  categories: CategoriesState
}
