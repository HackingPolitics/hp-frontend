import { AxiosInstance } from 'axios'
import { IArgument } from '~/types/apiSchema'

export default (axios: AxiosInstance) => ({
  update(id: number | string, argument: IArgument) {
    return axios.put('/arguments/' + id, argument) as Promise<IArgument>
  },
})
