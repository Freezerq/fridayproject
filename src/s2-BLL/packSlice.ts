import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const packSlice = createSlice({
  name: 'pack',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {},
})

export const {} = packSlice.actions

export const packReducer = packSlice.reducer

//types
type InitialStateType = typeof initialState
