import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  // login(email: string, password: string, rememberMe: boolean) {
  //   return instance.post<AxiosResponse<UserType>>('auth/login', { email, password, rememberMe })
  // },
  authMe() {
    return instance.post<UserType>('auth/me', {})
  },
  changeName(name: string) {
    return instance.put<AxiosResponse<UpdateUserResponseType>>('auth/me', { name })
  },
  changeImage(avatar: string) {
    return instance.put<AxiosResponse<UpdateUserResponseType>>('auth/me', { avatar })
  },
  getToken(email: string) {
    return instance.post<{ info: string; error: string }>(
      'auth/forgot',
      {
        email,
        from: 'test-front-admin <ai73a@yandex.by>',
        message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`,
      },
      { baseURL: 'https://neko-back.herokuapp.com/2.0' }
    )
  },
}

//types
type UpdateUserResponseType = {
  updatedUser: UserType
  error?: string
}
export type UserType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number // количество колод
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean
  token: string
  tokenDeathTime: number
}
type AddedUserType = {
  created: string
  email: string
  isAdmin: boolean
  name: string
  publicCardPacksCount: number
  rememberMe: boolean
  updated: string
  verified: boolean
  __v: number
  _id: string
}
