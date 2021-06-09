import { AxiosInstance } from 'axios'
import { IProject } from '~/types/apiSchema'

export default (axios: AxiosInstance) => ({
  createProject(project: IProject): Promise<IProject> {
    return axios.post('/projects', project) as Promise<IProject>
  },
  fetchProjects(): Promise<IProject[]> {
    return axios.get('/projects') as Promise<IProject[]>
  },
})
