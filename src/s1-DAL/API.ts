import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  authMe() {
    return instance.post<UserType>('auth/me')
  },
  register(data: LoginType) {
    return instance.post('/auth/register', data)
  },
  login(data: { email: string; password: string }) {
    return instance.post<UserType>('auth/login', data)
  },
  logout() {
    return instance.delete('auth/me')
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
  createNewPassword(data: NewPasswordRequestType) {
    return instance.post<NewPasswordResponseType>('auth/set-new-password', data, {
      baseURL: 'https://neko-back.herokuapp.com/2.0',
    })
  },
}

export const cardsAPI = {
  getAllCards() {
    return instance.get('/cards/card')
  },
  addNewCard() {
    return instance.post('/cards/card')
  },
  deleteCard() {
    return instance.delete('cards/card')
  },
  updateCard() {
    return instance.put('cards/card')
  },
}

export const packsAPI = {
  getAllPacks() {
    return instance.get('/cards/pack')
  },
  addNewPack() {
    return instance.post('/cards/pack')
  },
  deletePack() {
    return instance.delete('cards/pack')
  },
  updatePack() {
    return instance.put('cards/pack')
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

export type LoginType = {
  email: string
  password: string
  rememberMe?: false
}
export type NewPasswordRequestType = {
  password: string
  resetPasswordToken: string
}
export type NewPasswordResponseType = {
  info: string
  error?: string
}
