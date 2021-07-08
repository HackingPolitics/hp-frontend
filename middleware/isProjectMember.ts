import { Middleware } from '@nuxt/types'

const isProjectMember: Middleware = (context) => {
  const { redirect, route, store } = context

  const canEdit = store.getters['projects/canEditProject'](
    parseInt(route.params.id)
  )

  if (!canEdit) {
    redirect(`/antraege/${route.params.id}`)
  }
}

export default isProjectMember
