import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, combineReducers } from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'

import { authReducer } from '../features/Profile/auth-reducer'
import { registrationReducer } from '../features/Registration/registrationSlice'

import { appReducer } from './appSlice'
import { loginReducer } from '../features/Login/loginReducer'
import { profileReducer } from '../features/Profile/profileReducer'

export const rootReducer = combineReducers({
  app: appReducer,
  registration: registrationReducer,
  auth: authReducer,
  profile: profileReducer,
  login: loginReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

//types
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
export type AppActionTypes = AnyAction
export type RootState = ReturnType<typeof store.getState>
