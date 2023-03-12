import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { authAPI, instance, UserType } from '../s1-DAL/auth-API'
import { loginAPI, LoginType, NewPasswordRequestType } from '../s1-DAL/loginAPI'
import { errorUtils } from '../utils/errorUtils'

import { setAppError, setAppStatus, setIsInitializedAC } from './appSlice'

const initialState = {
  profile: {} as UserType,
  isLoggedIn: false,
  isCreateNewPassword: false,
  isRegistered: false,
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
  },
  extraReducers: builder => {
    builder.addCase(registrationThunk.fulfilled, (state, action) => {
      state.isRegistered = true
    })
  },
})

export const authReducer = slice.reducer

//action creators
export const { setAuthUserData, changeName, changeAvatar, setIsLoggedIn, createNewPasswordAC } =
  slice.actions

//thunk creators
export const getAuthUserData = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const result = await authAPI.authMe()

    if (result.data) {
      dispatch(setAuthUserData({ data: result.data }))
    }
    dispatch(setIsLoggedIn({ value: true }))
  } catch (e) {
    // errorUtils(dispatch, e)
  } finally {
    dispatch(setIsInitializedAC({ value: true }))
    dispatch(setAppStatus({ status: 'succeeded' }))
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
  const res = await authAPI.getToken(email)

  try {
    if (res.data.error) {
      //dispath(status successful)
    }
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message
      // dispatch(setError(error))
    } else {
      //dispatch(setError(`Native error ${err.message}`))
    }
  }
}

export const login = (data: LoginType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const response = await loginAPI.login(data)

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
    const result = await loginAPI.logout()

    dispatch(setIsLoggedIn({ value: false }))
    dispatch(setAppStatus({ status: 'idle' }))

    return result
  } catch (e: any) {
    console.log('e')
    dispatch(setAppError(e.response.data.error))
    dispatch(setAppStatus({ status: 'idle' }))
  }
}
export const createNewPassword = (data: NewPasswordRequestType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    await loginAPI.createNewPassword(data)
    dispatch(createNewPasswordAC({ value: true }))

    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e: any) {
    errorUtils(dispatch, e)
  }
}

export const registrationThunk = createAsyncThunk(
  'registration',
  async function (data: { email: string; password: string }, { dispatch }) {
    console.log(data)
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await instance.post('/auth/register', { email: data.email, password: data.password })
      dispatch(setAppStatus({ status: 'idle' }))
    } catch (e: any) {
      console.log(e)
      dispatch(setAppError(e.response.data.error))
      dispatch(setAppStatus({ status: 'idle' }))
    }
  }
)

//types
type InitialStateType = typeof initialState
