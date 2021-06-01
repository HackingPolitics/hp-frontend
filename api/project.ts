import { AxiosInstance } from 'axios'
import { IProject } from '~/types/apiSchema'

export default (axios: AxiosInstance) => ({
  createProject(project: IProject): Promise<IProject> {
    return axios.post('/projects', project) as Promise<IProject>
  },
  updateProject(id: number | string, project: IProject) {
    return axios.put('/projects/' + id, project) as Promise<IProject>
  },
  getProject(id: number | string) {
    return axios.get('/projects/' + id) as Promise<IProject>
  },
})
