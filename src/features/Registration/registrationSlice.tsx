import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { instance } from '../../app/store'

const initialState = {}
const registrationSlice = createSlice({
  name: 'registration',
  initialState: {},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registrationThunk.fulfilled, (state, action) => {})
  },
})

export const registrationThunk = createAsyncThunk(
  'registration',
  async function (data: { email: string; password: string }) {
    const result = await instance.post('/auth/register', { ...data })

    console.log(result)
  }
)
