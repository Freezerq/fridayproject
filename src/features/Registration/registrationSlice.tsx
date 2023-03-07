import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { setAppError, setAppStatus } from '../../app/appSlice'
import { instance } from '../Profile/auth-API'

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
  async function (data: { email: string; password: string }, { rejectWithValue, dispatch }) {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await instance.post('/auth/register', { ...data })
      dispatch(setAppStatus({ status: 'idle' }))
    } catch (e: any) {
      console.log(e)
      dispatch(setAppError(e.response.data.error))
      dispatch(setAppStatus({ status: 'idle' }))
    }
  }
)

export const registrationReducer = registrationSlice.reducer
