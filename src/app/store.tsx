import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, combineReducers } from 'redux'
import { ThunkAction } from 'redux-thunk'

export const rootReducer = combineReducers({})

export const store = configureStore({
  //сюда надо класть profile: import profileReducer
  reducer: rootReducer,
})

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

//types
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
export type AppActionTypes = AnyAction
export type RootState = ReturnType<typeof store.getState>
