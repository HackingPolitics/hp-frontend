export const translateErrorMessage = (message: string): string => {
  switch (message) {
    case 'user.invalidCredentials':
      return 'Logindaten ungülting. Bitte Logindaten überprüfen'
    case 'Email already exists.':
      return 'Email bereits vergeben'
    case 'username: validate.user.username.notValid':
      return 'Username ist nicht gültig'
    default:
      return message
  }
}
