import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { setIsLoggedInAC } from '../features/Login/loginReducer'
import { setAuthUserData } from '../features/Profile/auth-reducer'
import { errorUtils } from '../utils/errorUtils'

import { appAPI } from './appAPI'

const initialState: InitialStateType = {
  error: null,
  status: 'succeeded' as StatusAppType,
  isInitialized: false,
}
const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: StatusAppType }>) => {
      state.status = action.payload.status
    },
    setIsInitializedAC: (state, action: PayloadAction<{ value: boolean }>) => {
      state.isInitialized = action.payload.value
    },
  },
})

//thunks
export const me = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const response = await appAPI.me()

    dispatch(setIsLoggedInAC({ value: true }))
    dispatch(setAuthUserData({ data: response.data }))
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e: any) {
    errorUtils(dispatch, e)
  } finally {
    dispatch(setIsInitializedAC({ value: true }))
  }
}

// export const registrationThunk = createAsyncThunk(
//   '123',
//   async function (data: { email: string; password: string }) {
//     try {
//       const res = await instance.post('/auth/register', { ...data })
//     } catch (e) {
//       console.log(e)
//     }
//   }
// )

export const { setAppError, setAppStatus, setIsInitializedAC } = appSlice.actions
export const appReducer = appSlice.reducer

//types
type StatusAppType = 'loading' | 'idle' | 'succeeded' | 'failed'

type InitialStateType = {
  error: string | null
  status: StatusAppType
  isInitialized: boolean
}
