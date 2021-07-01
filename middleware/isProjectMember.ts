import { Middleware } from '@nuxt/types'

const isProjectMember: Middleware = (context) => {
  const { redirect, route, store } = context

  console.log(route.params.id)

  const canEdit = store.getters['projects/canEditProject'](
    parseInt(route.params.id)
  )

  console.log(canEdit)
  if (!canEdit) {
    redirect(`/antraege/${route.params.id}`)
  }
}

export default isProjectMember
