import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

import {
  AddNewCardType,
  cardsAPI,
  CardsReturnType,
  GetCardsType,
  UpdateCardType,
} from '../s1-DAL/cardsAPI'
import { AppDispatch } from '../s1-DAL/store'
import { errorUtils } from '../utils/errorUtils'

import { setAppStatus } from './appSlice'

const initialState = {
  cardsData: {} as CardsReturnType,
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialState,
  reducers: {
    setCards: (state, action: PayloadAction<{ cardsData: CardsReturnType }>) => {
      state.cardsData = action.payload.cardsData
    },
  },
})

export const { setCards } = cardsSlice.actions

export const cardsReducer = cardsSlice.reducer

//thunkCreators
export const getCards = (attributes: GetCardsType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const result = await cardsAPI.getAllCards(attributes)

    dispatch(setCards({ cardsData: result.data }))
  } catch (e: any) {
    errorUtils(dispatch, e)
  } finally {
    dispatch(setAppStatus({ status: 'succeeded' }))
  }
}

export const addNewCard =
  (data: AddNewCardType, attributes: GetCardsType) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await cardsAPI.addNewCard(data)

      dispatch(getCards(attributes))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }

export const deleteCard =
  (cardId: string, attributes: GetCardsType) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await cardsAPI.deleteCard(cardId)

      dispatch(getCards(attributes))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }
export const updateCard =
  (data: UpdateCardType, attributes: GetCardsType) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await cardsAPI.updateCard(data)

      dispatch(getCards(attributes))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }

//types
type InitialStateType = typeof initialState
