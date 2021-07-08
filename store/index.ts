import { AuthState } from './authentication'
import { FractionsState } from './fractions'
import { CouncilState } from './councils'
import { ProjectsState } from '~/store/projects'
import { CategoriesState } from '~/store/categories'
import { IUser } from '~/types/apiSchema'

export const state = () => ({})

interface NuxtAuth {
  loggedIn: boolean
  user: IUser
  busy: boolean
}

export interface RootState {
  authentication: AuthState
  projects: ProjectsState
  categories: CategoriesState
  fractions: FractionsState
  councils: CouncilState
  auth: NuxtAuth
}
