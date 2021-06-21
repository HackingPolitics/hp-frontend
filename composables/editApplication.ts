import {
  computed,
  ComputedRef,
  useContext,
  useStore,
} from '@nuxtjs/composition-api'
import { camelCase, cloneDeep } from 'lodash'
import { RootState } from '~/store'
import { IProject } from '~/types/apiSchema'

export default function () {
  const store = useStore<RootState>()
  const context = useContext()

  const project: ComputedRef<IProject | null> = computed(
    (): IProject | null => store.state.projects.project
  )

  const createProjectEntity = async <T>(
    endpoint: string,
    entityData: T[],
    payload: T,
    projectKey: string | null = null,
    notificationOptions: {
      title?: string
      duration?: number
      type?: string
    } = {
      title: 'Änderungen gespeichert',
      duration: 300,
      type: 'success',
    }
  ) => {
    return await context.$axios.post(endpoint, payload).then((res) => {
      const payload = cloneDeep(entityData)
      payload.push(res.data)
      store.dispatch('projects/updateProjectProperty', [
        projectKey || camelCase(endpoint),
        payload,
      ])
      // @ts-ignore
      context.$notify({
        title: notificationOptions.title,
        duration: notificationOptions.duration,
        type: notificationOptions.type,
      })
      return res
    })
  }

  const deleteProjectEntity = async <T extends { id?: string }>(
    endpoint: string,
    id: string | number,
    entityData: T[],
    notificationOptions: {
      title?: string
      duration?: number
      type?: string
    } = {
      title: 'Erfolgreich gelöscht',
      duration: 300,
      type: 'success',
    }
  ) => {
    await context.$axios.delete(endpoint + '/' + id).then(() => {
      const payload = entityData.filter((e: T) => e.id !== id)
      store.dispatch('projects/updateProjectProperty', [
        camelCase(endpoint),
        payload,
      ])
      // @ts-ignore
      context.$notify({
        title: notificationOptions.title,
        duration: notificationOptions.duration,
        type: notificationOptions.type,
      })
    })
  }

  const updateProjectEntity = async <T>(
    endpoint: string,
    id: string | number,
    payload: T,
    notificationOptions: {
      title?: string
      duration?: number
      type?: string
    } = {
      title: 'Erfolgreich gespeichert',
      duration: 300,
      type: 'success',
    }
  ) => {
    await context.$axios.put(endpoint + '/' + id, payload).then(() => {
      store.dispatch('projects/fetchProject', project.value?.id)
      // @ts-ignore
      context.$notify({
        title: notificationOptions.title,
        duration: notificationOptions.duration,
        type: notificationOptions.type,
      })
    })
  }

  return {
    createProjectEntity,
    deleteProjectEntity,
    updateProjectEntity,
    project,
  }
}
