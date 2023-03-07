import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { authAPI, LoginResponseType, LoginType } from './authAPI'

// @ts-ignore
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

export const authReducer = authSlice.reducer

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
