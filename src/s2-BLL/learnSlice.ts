import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CardType } from '../s1-DAL/cardsAPI'

const initialState = {
  isFirst: true,
  showAnswer: false,
  currentCard: {} as CardType,
  grade: 1,
}

const learnSlice = createSlice({
  name: 'learn',
  initialState: initialState,
  reducers: {
    setIsFirst(state, action: PayloadAction<{ isFirst: boolean }>) {
      state.isFirst = action.payload.isFirst
    },
    setCurrentCard(state, action: PayloadAction<CardType>) {
      state.currentCard = action.payload
    },
    setShowAnswer(state, action: PayloadAction<{ showAnswer: boolean }>) {
      state.showAnswer = action.payload.showAnswer
    },
    setGrade(state, action: PayloadAction<{ grade: number }>) {
      state.grade = action.payload.grade
    },
  },
})

export const { setIsFirst, setShowAnswer, setCurrentCard, setGrade } = learnSlice.actions
export const learnReducer = learnSlice.reducer
