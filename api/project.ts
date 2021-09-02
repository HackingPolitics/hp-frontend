import { AxiosInstance } from 'axios'
import { IProject } from '~/types/apiSchema'

export default (axios: AxiosInstance) => ({
  createProject(project: IProject): Promise<IProject> {
    return axios.post('/projects', project) as Promise<IProject>
  },
  updateProject(id: number | string, project: IProject) {
    if (id === null || typeof id === 'undefined') {
      throw new TypeError('Updated project id is null or undefined')
    }
    return axios.put('/projects/' + id, project) as Promise<IProject>
  },
  fetchProject(id: number | string): Promise<IProject> {
    if (id === null || typeof id === 'undefined') {
      throw new TypeError('Fetched project id is null or undefined')
    }
    return axios.get('/projects/' + id) as Promise<IProject[]>
  },
  fetchProjects(): Promise<IProject[]> {
    return axios.get('/projects') as Promise<IProject[]>
  },
})
