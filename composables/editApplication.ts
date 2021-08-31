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
    payload: T,
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
