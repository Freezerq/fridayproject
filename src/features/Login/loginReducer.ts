import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/appSlice'
import { errorUtils } from '../../utils/errorUtils'
import { setAuthUserData } from '../Profile/auth-reducer'

import { loginAPI, LoginType, NewPasswordRequestType } from './loginAPI'

const initialState = {
  isLoggedIn: false,
  isCreateNewPassword: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
    createNewPasswordAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isCreateNewPassword = action.payload.value
    },
  },
})

export const loginReducer = authSlice.reducer

export const { setIsLoggedInAC, createNewPasswordAC } = authSlice.actions

//thunk
export const loginTC = (data: LoginType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const response = await loginAPI.login(data)

    dispatch(setIsLoggedInAC({ value: true }))
    dispatch(setAuthUserData({ data: response.data }))
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e: any) {
    errorUtils(dispatch, e)
  }
}
export const createNewPasswordTC = (data: NewPasswordRequestType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    await loginAPI.createNewPassword(data)
    dispatch(createNewPasswordAC({ value: true }))

    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e: any) {
    errorUtils(dispatch, e)
  }
}
