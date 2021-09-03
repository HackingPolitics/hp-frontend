import { computed, ref, useContext, useStore } from '@nuxtjs/composition-api'
import { RootState } from '~/store'
import { IProject } from '~/types/apiSchema'

export default function () {
  const store = useStore<RootState>()
  const context = useContext()
  // Collab

  const userName = computed(() => {
    return store.state.auth.user.username
  })

  const recentProjectSaved = computed(() => {
    return store.state.collaboration.recentProjectSaved
  })

  const projectSaved = computed(() => {
    return store.state.collaboration.projectSaved
  })

  const lockedFields = computed(() => {
    return store.state.collaboration.lockedFields
  })

  const setLockedField = (fieldName: string | null) => {
    store.commit('collaboration/SET_LOCKED_FIELD', fieldName)
    store.commit('collaboration/SET_LOCKED_SINCE', Date.now())
  }

  const fieldIsLocked = (fieldName: string) => {
    if (
      lockedFields.value[fieldName]?.locked &&
      lockedFields.value[fieldName].by === userName.value
    ) {
      return false
    }
    return !!(
      lockedFields.value[fieldName]?.locked &&
      lockedFields.value[fieldName].by !== userName.value
    )
  }

  const setLockedFieldText = (fieldName: string) => {
    return fieldIsLocked(fieldName)
      ? lockedFields.value &&
          lockedFields.value[fieldName]?.by +
            ' ' +
            context.i18n.t('collaborations.field.usedBy')
      : null
  }

  const setFieldUpdated = () => {
    resetLockedField()
    store.commit('collaboration/SET_PROJECT_SAVED', Date.now())
  }

  const resetLockedField = () => {
    store.commit('collaboration/SET_LOCKED_FIELD', null)
  }

  //
  return {
    userName,
    recentProjectSaved,
    projectSaved,
    lockedFields,
    setLockedFieldText,
    setLockedField,
    fieldIsLocked,
    setFieldUpdated,
    resetLockedField,
  }
}
