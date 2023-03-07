import axios from 'axios'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})
export const authAPI = {
  login(data: LoginType) {
    return instance.post<LoginResponseType>('auth/login', data)
  },
  logout() {
    return instance.delete('auth/me')
  },
}
export type LoginType = {
  email: string
  password: string
  rememberMe: false
}
export type LoginResponseType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number

  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean

  error?: string
}
