import { Middleware } from '@nuxt/types'

const getCurrentArea: Middleware = (context) => {
  const { redirect, route, store } = context

  const currentArea = route?.meta?.find((meta) => {
    return 'area' in meta && typeof meta.area !== 'undefined'
  })
  store.commit('collaboration/SET_CURRENT_AREA', currentArea?.area)
}

export default getCurrentArea
