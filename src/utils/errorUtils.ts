import { Dispatch } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { setAppError, setAppStatus } from '../app/appSlice'

export const errorUtils = (dispatch: Dispatch, e: any) => {
  const err = e as Error | AxiosError<{ error: string }>

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data : err.message

    dispatch(setAppError(error))
  } else {
    dispatch(setAppError({ error: `native error ${err.message}` }))
  }

  dispatch(setAppStatus({ status: 'failed' }))
}
