// export class User {
//   public getUserByUsername = (username: string): Promise<IUser> => {
//     return $axios.getUsers({ username }).then((users) =>
//       users['hydra:member'].shift()
//     )
//   }

//   public getUser = (id: number): Promise<IUser> => {
//     return $axios.get(`/users/${id}`) as Promise<IUser>
//   }

//   public getUsers = (query: any = {}): Promise<IHydraCollection<IUser>> => {
//     return $axios.get('/users', query) as Promise<IHydraCollection<IUser>>
//   }

//   public createUser = (user: IUser): Promise<IUser> => {
//     return $axios.post('/users', user) as Promise<IUser>
//   }

//   public registerUser = (user: IRegistration): Promise<IUser> => {
//     return $axios.post('/users/register', user) as Promise<IUser>
//   }

//   public forgotPassword = (data: IPasswordResetRequest): Promise<void> => {
//     return $axios.post('/users/reset-password', data) as Promise<void>
//   }

//   public updateUser = (user: IUser): Promise<IUser> => {
//     return $axios.put(user['@id'], user) as Promise<IFund>
//   }

//   public deleteUser = (user: IUser): Promise<void> => {
//     return $axios.delete(user['@id']) as Promise<void>
//   }

//   public changeEmail = (user: IUser, data: IEmailChange): Promise<void> => {
//     return $axios.post(user['@id'] + '/change-email', data) as Promise<void>
//   }
// }
