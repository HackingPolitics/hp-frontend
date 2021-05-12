import { AxiosInstance } from 'axios'
import { IUser, IHydraCollection } from '../types/apiSchema'

export default (axios: AxiosInstance) => ({
  getUser(id: number): Promise<IUser> {
    return axios.get(`/users/${id}`) as Promise<IUser>
  },

  getUsers(query: any = {}): Promise<IHydraCollection<IUser>> {
    return axios.get('/users', query) as Promise<IHydraCollection<IUser>>
  },

  //   getUserByUsername(username: string): Promise<IUser> {
  //     return getUsers({ username }).then((users) => users['hydra:member'].shift())
  //   },

  createUser(user: IUser): Promise<IUser> {
    return axios.post('/users', user) as Promise<IUser>
  },

  updateUser(user: IUser): Promise<IUser> {
    const id = user.id
    return axios.put(`/users/${id}`, user) as Promise<IUser>
  },

  deleteUser(user: IUser): Promise<void> {
    const id = user.id
    return axios.delete(`/users/${id}`) as Promise<void>
  },
})
