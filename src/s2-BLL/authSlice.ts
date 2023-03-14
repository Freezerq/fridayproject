import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { UserType, LoginType, NewPasswordType, authAPI } from '../s1-DAL/authAPI'
import { errorUtils } from '../utils/errorUtils'

import { setAppError, setAppStatus, setIsInitializedAC } from './appSlice'

const initialState = {
  profile: {} as UserType,
  isLoggedIn: false,
  isCreateNewPassword: false,
  isRegistered: false,
  isSendedEmail: false,
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
    setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
    createNewPasswordAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isCreateNewPassword = action.payload.value
    },
    setIsSendedEmailAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isSendedEmail = action.payload.value
    },
  },
  extraReducers: builder => {
    builder.addCase(registrationThunk.fulfilled, (state, action) => {
      state.isRegistered = true
    })
  },
})

export const authReducer = slice.reducer

//action creators
export const {
  setAuthUserData,
  changeName,
  changeAvatar,
  setIsLoggedIn,
  createNewPasswordAC,
  setIsSendedEmailAC,
} = slice.actions

//thunk creators
export const getAuthUserData = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const result = await authAPI.authMe()

    dispatch(setIsLoggedIn({ value: true }))
    dispatch(setAuthUserData({ data: result.data }))
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e: any) {
    console.error(e)
    dispatch(setIsLoggedIn({ value: false }))
    dispatch(setAppStatus({ status: 'failed' }))
  } finally {
    dispatch(setIsInitializedAC({ value: true }))
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
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    await authAPI.getToken(email)
    dispatch(setIsSendedEmailAC({ value: true }))
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e: any) {
    errorUtils(dispatch, e)
  }
}

export const loginTC = (data: LoginType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const response = await authAPI.login(data)

    dispatch(setIsLoggedIn({ value: true }))
    dispatch(setAuthUserData({ data: response.data }))
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e: any) {
    errorUtils(dispatch, e)
  }
}

export const logOutTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const result = await authAPI.logout()

    dispatch(setIsLoggedIn({ value: false }))
    dispatch(setAppStatus({ status: 'idle' }))

    return result
  } catch (e: any) {
    console.log('e')
    dispatch(setAppError(e.response.data.error))
    dispatch(setAppStatus({ status: 'idle' }))
  }
}
export const createNewPassword = (data: NewPasswordType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    await authAPI.createNewPassword(data)
    dispatch(createNewPasswordAC({ value: true }))

    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e: any) {
    errorUtils(dispatch, e)
  }
}

export const registrationThunk = createAsyncThunk(
  'registration',
  async function (data: { email: string; password: string }, { dispatch }) {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await authAPI.register({ email: data.email, password: data.password })
      dispatch(setAppStatus({ status: 'idle' }))
      dispatch(loginTC({ email: data.email, password: data.password, rememberMe: true }))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }
)

//types
type InitialStateType = typeof initialState
