import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { setAppError, setAppStatus } from '../../app/appSlice'
import { errorUtils } from '../../utils/errorUtils'
import { setAuthUserData } from '../Profile/auth-reducer'

import { loginAPI, LoginType } from './loginAPI'

const initialState = {
  isLoggedIn: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
  },
})

export const loginReducer = authSlice.reducer

export const { setIsLoggedInAC } = authSlice.actions

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
