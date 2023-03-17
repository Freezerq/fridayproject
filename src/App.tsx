import React, { useEffect } from 'react'

import './App.css'

import { useAppDispatch, useAppSelector } from './s1-DAL/store'
import { getAuthUserData } from './s2-BLL/authSlice'
import AppRoutes from './s3-features/Routes/AppRoutes'
import { LinearProgress } from './s4-components/common/LinearProgress/LinearProgress'
import { ErrorSnackbar } from './s4-components/ErrorSnackBar/ErrorSnackBar'
import { Layout } from './s4-components/Header/Layout'

const App = () => {
  const isLoading = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAuthUserData())
  }, [])

  return (
    <div className="App">
      <ErrorSnackbar />
      <Layout>
        {isLoading === 'loading' ? <LinearProgress /> : null}
        <AppRoutes />
      </Layout>
    </div>
  )
}

export default App
