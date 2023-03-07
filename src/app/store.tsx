import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, combineReducers } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { profileReducer } from '../features/Profile/profileReducer'
import { registrationReducer } from '../features/Registration/registrationSlice'

import { appReducer } from './appSlice'

export const rootReducer = combineReducers({
  profile: profileReducer,
  app: appReducer,
  registration: registrationReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

//types
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
export type AppActionTypes = AnyAction
export type RootState = ReturnType<typeof store.getState>

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})
