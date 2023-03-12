import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { loginAPI, LoginType, NewPasswordRequestType } from '../s1-DAL/loginAPI'
import { errorUtils } from '../utils/errorUtils'

import { setAppError, setAppStatus } from './appSlice'
import { setAuthUserData } from './authSlice'

const initialState = {
  isLoggedIn: false,
  isCreateNewPassword: false,
}

export const loginSlice = createSlice({
  name: 'login',
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

export const loginReducer = loginSlice.reducer

export const { setIsLoggedInAC, createNewPasswordAC } = loginSlice.actions

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

export const logOutTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const result = await loginAPI.logout()

    dispatch(setIsLoggedInAC({ value: false }))
    dispatch(setAppStatus({ status: 'idle' }))

    return result
  } catch (e: any) {
    console.log('e')
    dispatch(setAppError(e.response.data.error))
    dispatch(setAppStatus({ status: 'idle' }))
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
