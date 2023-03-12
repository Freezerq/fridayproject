import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {},
})

export const {} = cardsSlice.actions

export const cardsReducer = cardsSlice.reducer

//types
type InitialStateType = typeof initialState
