import { AxiosInstance } from 'axios'
import { ICounterArgument } from '~/types/apiSchema'

export default (axios: AxiosInstance) => ({
  update(id: number | string, counterArgument: ICounterArgument) {
    return axios.put(
      '/counter_arguments/' + id,
      counterArgument
    ) as Promise<ICounterArgument>
  },
})
