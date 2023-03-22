import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'

import {
  AddNewCardType,
  cardsAPI,
  CardsReturnType,
  GetCardsType,
  UpdateCardGradeType,
  UpdateCardType,
} from '../s1-DAL/cardsAPI'
import { AppDispatch, RootState } from '../s1-DAL/store'
import { errorUtils } from '../utils/errorUtils'

import { setAppStatus } from './appSlice'
import { setShowAnswer } from './learnSlice'

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
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e: any) {
    errorUtils(dispatch, e)
  }
}

export const addNewCard =
  (data: AddNewCardType, attributes: GetCardsType) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      await cardsAPI.addNewCard(data)

      dispatch(getCards(attributes))
      dispatch(setAppStatus({ status: 'succeeded' }))
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
      dispatch(setAppStatus({ status: 'succeeded' }))
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
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }

export const updateCardGrade =
  (data: UpdateCardGradeType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const cardsData = getState().cards.cardsData

    dispatch(setAppStatus({ status: 'loading' }))
    try {
      const res = await cardsAPI.updateCardGrade(data)

      dispatch(
        setCards({
          cardsData: {
            ...cardsData,
            cards: cardsData.cards.map(card =>
              card._id === res.data.card_id
                ? { ...card, grade: res.data.grade, shots: res.data.shots }
                : card
            ),
          },
        })
      )
      dispatch(setAppStatus({ status: 'succeeded' }))
      dispatch(setShowAnswer({ showAnswer: false }))
    } catch (e: any) {
      errorUtils(dispatch, e)
    }
  }

//types
type InitialStateType = typeof initialState
