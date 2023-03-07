import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: InitialStateType = {
  error: null,
  status: 'succeeded' as StatusAppType,
}
const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: StatusAppType }>) => {
      state.status = action.payload.status
    },
  },
})

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

export const { setAppError, setAppStatus } = appSlice.actions
export const appReducer = appSlice.reducer

//types
type StatusAppType = 'loading' | 'idle' | 'succeeded'

type InitialStateType = {
  error: string | null
  status: StatusAppType
}
