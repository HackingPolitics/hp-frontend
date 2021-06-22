import { AxiosInstance } from 'axios'
import { IProjectMembership } from '~/types/apiSchema'

export default (axios: AxiosInstance) => ({
  create(projectMembership: IProjectMembership): Promise<IProjectMembership> {
    return axios.post(
      'project_memberships',
      projectMembership
    ) as Promise<IProjectMembership>
  },
  update(id: number | string, projectMembership: IProjectMembership) {
    return axios.put(
      'project_memberships/' + id,
      projectMembership
    ) as Promise<IProjectMembership>
  },
})
