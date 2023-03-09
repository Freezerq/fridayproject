import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { setAppError, setAppStatus } from '../../app/appSlice'

import { authAPI, LoginResponseType, LoginType } from './authAPI'

const initialState = {
  isLoggedIn: false,
  profile: {} as LoginResponseType,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
    testProfileAC(state, action: PayloadAction<LoginResponseType>) {
      state.profile = action.payload
    },
  },
})

export const loginReducer = authSlice.reducer

export const { setIsLoggedInAC, testProfileAC } = authSlice.actions
//thunk
export const loginTC = (data: LoginType) => async (dispatch: Dispatch) => {
  try {
    const response = await authAPI.login(data)

    dispatch(setIsLoggedInAC({ value: true }))
    dispatch(testProfileAC(response.data))
    //отправить данные response.data в профайл
  } catch (e: any) {
    const error = e.response ? e.response.data.error : e.message + ', more details in the console'

    console.log('Error: ', error)
  }
}

export const logOutTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const result = await authAPI.logout()

    dispatch(setIsLoggedInAC({ value: false }))

    return result
  } catch (e: any) {
    console.log('e')
    dispatch(setAppError(e.response.data.error))
    dispatch(setAppStatus({ status: 'idle' }))
  }
}
