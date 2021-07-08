import { AxiosInstance } from 'axios'
import { ICategory } from '~/types/apiSchema'

export default (axios: AxiosInstance) => ({
  //   createProject(project: IProject): Promise<IProject> {
  //     return axios.post('/projects', project) as Promise<IProject>
  //   },
  //   updateProject(id: number | string, project: IProject) {
  //     return axios.put('/projects/' + id, project) as Promise<IProject>
  //   },
  //   fetchProject(id: number | string): Promise<IProject> {
  //     return axios.get('/projects/' + id) as Promise<IProject[]>
  //   },
  fetchCategories(): Promise<ICategory[]> {
    return axios.get('/categories') as Promise<ICategory[]>
  },
})
