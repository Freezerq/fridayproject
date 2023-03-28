import React, { useEffect } from 'react'

import './App.module.scss'

import { useAppDispatch, useAppSelector } from '../s1-DAL/store'
import { getAuthUserData } from '../s2-BLL'
import { LinearProgress } from '../s4-common'

import { ErrorSnackbar } from './ErrorSnackBar/ErrorSnackBar'
import { Layout } from './Header/Layout'
import AppRoutes from './Routes/AppRoutes'

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
