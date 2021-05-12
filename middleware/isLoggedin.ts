import { Middleware } from '@nuxt/types'

const isLoggedIn: Middleware = async (context) => {
  const guestRoutes = [
    'login',
    'registrieren',
    'reset-password-token',
    'passwort-vergessen',
    'confirm-account-token',
    'antraege',
    'antraege-id',
  ]
  const { redirect, route, store, $axios } = context

  const user = store.state.auth.user

  const token = localStorage.getItem('auth_token')

  if (route.name && !guestRoutes.includes(route.name)) {
    if (!token) {
      // If the user is not authenticated
      console.log('redirect isLoggendin Middleware')
      return redirect('/login')
    }
    if (token && !user) {
      $axios.setToken(token, 'Bearer')
      await store.dispatch('auth/refreshToken')
    }
  }
}

export default isLoggedIn
