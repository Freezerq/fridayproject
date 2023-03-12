import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { packsAPI } from '../s1-DAL/packsAPI'
import { errorUtils } from '../utils/errorUtils'

const initialState: initialStateType = { packs: [] }

function packFromServerToNormal(pack: PackTypeFromServer): PackTypeOnlyNeeded {
  return {
    name: pack.name,
    user_name: pack.user_name,
    user_id: pack.user_id,
    _id: pack._id,
    updated: pack.updated.slice(0, 10),
    cardsCount: pack.cardsCount,
  }
}

const packSlice = createSlice({
  name: 'pack',
  initialState: initialState,
  reducers: {
    setPacks: (state, action: PayloadAction<{ packs: Array<PackTypeFromServer> }>) => {
      action.payload.packs.forEach(pack => {
        state.packs.push(packFromServerToNormal(pack))
      })
    },
  },
  extraReducers: builder => {},
})

export const { setPacks } = packSlice.actions

export const packReducer = packSlice.reducer

export const getPacksTC = createAsyncThunk('pack', async function (_, { dispatch }) {
  try {
    const result = await packsAPI.getAllPacks({ pageCount: 10, min: 15 })

    dispatch(setPacks({ packs: result.data.cardPacks }))
  } catch (e: any) {
    errorUtils(dispatch, e)
  }
})
//types

type PackTypeFromServer = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}
type initialStateType = {
  packs: Array<PackTypeOnlyNeeded>
}
export type PackTypeOnlyNeeded = {
  _id: string
  user_id: string
  user_name: string
  name: string
  cardsCount: number
  updated: string
}
