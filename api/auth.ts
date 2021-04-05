import { AxiosInstance, AxiosResponse } from 'axios'
import {
  IAuthReply,
  ICredentials,
  IEmailChange,
  IHydraCollection,
  INewPasswordRequest,
  IPasswordChange,
  IPasswordReset,
  IPasswordResetRequest,
  IRegistration,
  IUser,
  IUserStatistics,
  IValidation,
} from '@/types/apiSchema'

export default (axios: AxiosInstance) => ({
  forgotPassword(email: string) {
    return axios.post('/auth/password/forgot', { email })
  },

  requestAuthToken(credentials: ICredentials): Promise<IAuthReply> {
    return axios.post(
      '/authentication_token',
      credentials
    ) as Promise<IAuthReply>
  },

  refreshAuthToken(refreshToken: string): Promise<IAuthReply> {
    return axios.post('/refresh_token', {
      refresh_token: refreshToken,
    }) as Promise<IAuthReply>
  },

  logout() {
    return axios.get('/auth/logout')
  },

  registerUser(user: IRegistration): Promise<IUser> {
    return axios.post('/users/register', user) as Promise<IUser>
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
