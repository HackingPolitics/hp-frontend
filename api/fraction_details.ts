import { AxiosInstance } from 'axios'
import { IFractionDetails, IProject } from '~/types/apiSchema'

export default (axios: AxiosInstance) => ({
  updateFractionDetails(
    id: number | string,
    fractionDetails: IFractionDetails
  ) {
    if (id === null || typeof id === 'undefined') {
      throw new TypeError('Updated fraction details id is null or undefined')
    }
    return axios.put(
      '/fraction_details/' + id,
      fractionDetails
    ) as Promise<IFractionDetails>
  },
  createFractionDetails(fractionDetails: IFractionDetails): Promise<IProject> {
    return axios.post(
      '/fraction_details',
      fractionDetails
    ) as Promise<IFractionDetails>
  },
})
