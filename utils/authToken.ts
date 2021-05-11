export const authTokenName = 'auth_token'

export const getStoredAuthToken = () => localStorage.getItem(authTokenName)

export const storeAuthToken = (token: string) =>
  localStorage.setItem(authTokenName, token)

export const removeStoredAuthToken = () =>
  localStorage.removeItem(authTokenName)
