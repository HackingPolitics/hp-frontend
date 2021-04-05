export interface ICredentials {
  username: string
  password: string
}

export interface IAuthReply {
  token: string // encoded JWT
  refreshToken: string // token string to request a new JWT
  refreshTokenExpires: number // unix timestamp when
}

export enum UserRole {
  Admin = 'ROLE_ADMIN',
  User = 'ROLE_USER',
  Guest = 'ROLE_GUEST',
}

export interface IModel {
  [prop: string]: any
  '@id'?: string
  loadedWithRoles?: UserRole[]
}

export interface INumericIdentifierModel extends IModel {
  id?: number
}

export interface IHydraCollection<T extends IModel> {
  '@context'?: string
  '@id'?: string
  '@type'?: string
  'hydra:firstPage'?: number
  'hydra:itemsPerPage'?: number
  'hydra:lastPage'?: number
  'hydra:member'?: T[]
  'hydra:nextPage'?: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  'hydra:search'?: object // @todo
  'hydra:totalItems'?: number
  'hydra:view'?: {
    'hydra:first'?: string
    'hydra:last'?: string
    'hydra:next'?: string
  }
}

export interface IUser extends INumericIdentifierModel {
  '@id'?: string
  active?: boolean
  createdAt?: Date | string
  deletedAt?: Date | string
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  roles?: UserRole[]
  username?: string
  validated?: boolean
}

export interface IRegistration extends IUser {
  validationUrl: string
}

export interface IEmailChange {
  confirmationPassword: string
  email: string
  validationUrl?: string
}

export interface INewPasswordRequest {
  validationUrl?: string
}

export interface IPasswordResetRequest {
  username: string
  validationUrl?: string
}

export interface IPasswordChange {
  confirmationPassword: string
  password?: string
}

export interface IValidation {
  id: string
  token: string
}

export interface IPasswordReset extends IValidation {
  password: string
}

export interface IUserStatistics {
  deleted: number
  existing: number
  newlyRegistered: number
  notActive: number
  notValidated: number
}
