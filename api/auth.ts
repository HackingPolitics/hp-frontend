import { AxiosInstance } from 'axios'
import {
  IAuthReply,
  ICredentials,
  IPasswordReset,
  IPasswordResetRequest,
  IRegistration,
  IUser,
  IValidation,
} from '../types/apiSchema'

export default (axios: AxiosInstance) => ({
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

  confirmEmailAddress(data: IValidation): Promise<boolean> {
    return axios.post(`/validations/${data.id}/confirm`, { token: data.token })
  },

  passwordResetRequest(data: IPasswordResetRequest): Promise<boolean> {
    return axios.post(`/users/reset-password`, data) as Promise<boolean>
  },

  passwordReset(data: IPasswordReset): Promise<boolean> {
    return axios.post(`/validations/${data.id}/confirm`, {
      token: data.token,
      password: data.password,
    })
  },

  logout() {
    return axios.get('/auth/logout')
  },

  registerUser(user: IRegistration): Promise<IUser> {
    return axios.post('/users/register', user) as Promise<IUser>
  },
})
