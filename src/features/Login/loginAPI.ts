import axios from 'axios'

import { UserType } from '../Profile/auth-API'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})
export const loginAPI = {
  login(data: LoginType) {
    return instance.post<UserType>('auth/login', data)
  },
  logout() {
    return instance.delete('auth/me')
  },
  createNewPassword(data: NewPasswordRequestType) {
    return instance.post<NewPasswordResponseType>('auth/set-new-password', data)
  },
}
export type LoginType = {
  email: string
  password: string
  rememberMe: false
}
export type NewPasswordRequestType = {
  password: string
  resetPasswordToken: string
}
export type NewPasswordResponseType = {
  info: string
  error?: string
}
