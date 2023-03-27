import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CardType } from '../s1-DAL/cardsAPI'

const initialState = {
  isFirst: true,
  showAnswer: false,
  currentCard: {} as CardType,
  // grade: 0,
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
      state.currentCard.grade = action.payload.grade
    },
    setShots(state, action: PayloadAction<{ shots: number }>) {
      state.currentCard.shots = action.payload.shots
    },
  },
})

export const { setIsFirst, setShowAnswer, setCurrentCard, setGrade, setShots } = learnSlice.actions
export const learnReducer = learnSlice.reducer
