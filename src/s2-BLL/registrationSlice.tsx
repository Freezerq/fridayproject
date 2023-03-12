import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { instance } from '../s1-DAL/auth-API'

import { setAppError, setAppStatus } from './appSlice'

const initialState = {
  isRegistered: false,
}
const registrationSlice = createSlice({
  name: 'registration',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registrationThunk.fulfilled, (state, action) => {
      state.isRegistered = true
    })
  },
})

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

export const registrationReducer = registrationSlice.reducer
