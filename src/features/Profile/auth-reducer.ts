import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setIsLoggedInAC } from '../Login/loginReducer'

import { authAPI, UserType } from './auth-API'

const initialState = {
  profile: {} as UserType,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUserData(state, action: PayloadAction<{ data: UserType }>) {
      state.profile = action.payload.data
    },
    changeName(state, action: PayloadAction<{ name: string }>) {
      state.profile.name = action.payload.name
    },
    changeAvatar(state, action: PayloadAction<{ avatar: string }>) {
      state.profile.avatar = action.payload.avatar
    },
  },
})

export const authReducer = slice.reducer

//action creators
export const { setAuthUserData, changeName, changeAvatar } = slice.actions

//thunk creators
export const getAuthUserData = () => async (dispatch: Dispatch) => {
  try {
    const result = await authAPI.authMe()

    if (result.data) {
      dispatch(setAuthUserData({ data: result.data }))
      dispatch(setIsLoggedInAC({ value: true }))
    }
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message
      //dispatch(setError(error))
    } else {
      //dispatch(setError(`Native error ${err.message}`))
    }
  }
}
export const changeProfileName = (name: string) => async (dispatch: Dispatch) => {
  const result = await authAPI.changeName(name)

  try {
    dispatch(changeName({ name }))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message
      //dispatch(setError(error))
    } else {
      //dispatch(setError(`Native error ${err.message}`))
    }
  }
}
export const changeProfileImage = (avatar: string) => async (dispatch: Dispatch) => {
  const result = await authAPI.changeImage(avatar)

  try {
    dispatch(changeAvatar({ avatar }))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message
      //dispatch(setError(error))
    } else {
      //dispatch(setError(`Native error ${err.message}`))
    }
  }
}

export const getNewToken = (email: string) => async (dispatch: Dispatch) => {
  debugger
  const res = await authAPI.getToken(email)

  try {
    if (res.data.error) {
      //dispath(status successful)
    }
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message
      //dispatch(setError(error))
    } else {
      //dispatch(setError(`Native error ${err.message}`))
    }
  }
}

//types
type InitialStateType = typeof initialState
