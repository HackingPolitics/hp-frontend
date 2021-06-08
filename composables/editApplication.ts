import {
  computed,
  ComputedRef,
  useContext,
  useStore,
} from '@nuxtjs/composition-api'
import { cloneDeep } from 'lodash'
import { RootState } from '~/store'
import { IProject } from '~/types/apiSchema'

export default function () {
  const store = useStore<RootState>()
  const context = useContext()

  const project: ComputedRef<IProject | null> = computed(
    (): IProject | null => store.state.projects.project
  )

  const createEntity = async <T>(
    endpoint: string,
    entityData: T[],
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
    await context.$axios.post(endpoint, payload).then((res) => {
      const payload = cloneDeep(entityData)
      payload.push(res.data)
      store.dispatch('projects/updateProjectProperty', [endpoint, payload])
      context.$notify({
        title: notificationOptions.title,
        duration: notificationOptions.duration,
        type: notificationOptions.type,
      })
    })
  }

  const deleteEntity = async <T extends { id?: string }>(
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
      store.dispatch('projects/updateProjectProperty', [endpoint, payload])
      context.$notify({
        title: notificationOptions.title,
        duration: notificationOptions.duration,
        type: notificationOptions.type,
      })
    })
  }

  const updateEntity = async <T>(
    endpoint: string,
    id: string | number,
    payload: T,
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
    await context.$axios.put(endpoint + '/' + id, payload).then(() => {
      store.dispatch('projects/fetchProject', project.value?.id)
      context.$notify({
        title: notificationOptions.title,
        duration: notificationOptions.duration,
        type: notificationOptions.type,
      })
    })
  }

  return {
    createEntity,
    deleteEntity,
    updateEntity,
    project,
  }
}
