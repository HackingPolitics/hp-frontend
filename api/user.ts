import { AxiosInstance, AxiosResponse } from 'axios'

export default (axios: AxiosInstance) => ({
  forgotPassword(email: string) {
    return axios.post('/auth/password/forgot', { email })
  },

  login(email: string, password: string) {
    return axios.post('/auth/login', { email, password })
  },

  logout() {
    return axios.get('/auth/logout')
  },

  register(payload: AxiosResponse) {
    return axios.post('/auth/register', payload)
  },

  resetPassword(
    password: string,
    passwordConfirmation: string,
    resetToken: string
  ) {
    return axios.post('/auth/password/reset', {
      password,
      password_confirmation: passwordConfirmation,
      token: resetToken,
    })
  },
})
