import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

import {
  AddNewPackType,
  GetPacksType,
  PackReturnType,
  packsAPI,
  UpdatePackType,
} from '../s1-DAL/packsAPI'
import { AppDispatch } from '../s1-DAL/store'
import { errorUtils } from '../utils/errorUtils'

import { setAppStatus } from './appSlice'

const initialState = {
  packsData: {} as PackReturnType,
  attributesData: {} as GetPacksType,
}

const packSlice = createSlice({
  name: 'pack',
  initialState: initialState,
  reducers: {
    setPacks: (state, action: PayloadAction<{ packsData: PackReturnType }>) => {
      state.packsData = action.payload.packsData
      action.payload.packsData.cardPacks.forEach(pack => state.packsData.cardPacks.push(pack))
    },
    setPacksAttributes: (state, action: PayloadAction<{ attributes: GetPacksType }>) => {
      state.attributesData = action.payload.attributes
    },
  },
  extraReducers: builder => {},
})

export const { setPacks, setPacksAttributes } = packSlice.actions

export const packReducer = packSlice.reducer

//Thunk creators
export const getPacks = (attributes: GetPacksType) => async (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const result = await packsAPI.getAllPacks(attributes)

    console.log(result.data)
    dispatch(setPacks({ packsData: result.data }))
    dispatch(setPacksAttributesTC(attributes))
  } catch (e: any) {
    errorUtils(dispatch, e)
  } finally {
    dispatch(setAppStatus({ status: 'succeeded' }))
  }
}

export const setPacksAttributesTC = (attributes: GetPacksType) => (dispatch: Dispatch) => {
  dispatch(setPacksAttributes({ attributes }))
}

export const addNewPack =
  (data: AddNewPackType, attributes: GetPacksType) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await packsAPI.addNewPack(data)

      dispatch(getPacks(attributes))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }

export const deletePack =
  (packId: string, attributes: GetPacksType) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await packsAPI.deletePack(packId)

      dispatch(getPacks(attributes))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }
export const updatePack =
  (data: UpdatePackType, attributes: GetPacksType) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await packsAPI.updatePack(data)

      dispatch(getPacks(attributes))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }

//types
type initialStateType = typeof initialState
