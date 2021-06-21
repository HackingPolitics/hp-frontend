import { AxiosInstance } from 'axios'
import { INegations } from '~/types/apiSchema'

export default (axios: AxiosInstance) => ({
  update(id: number | string, argument: INegations) {
    return axios.put('/arguments/' + id, argument) as Promise<INegations>
  },
  create(negation: INegations): Promise<INegations> {
    return axios.post('/negations', negation) as Promise<INegations>
  },
})
