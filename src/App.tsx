import React, { useEffect } from 'react'

import './App.css'

import { me } from './app/appSlice'
import { useAppDispatch, useAppSelector } from './app/store'
import { LinearProgress } from './components/common/LinearProgress/LinearProgress'
import { ErrorSnackbar } from './components/ErrorSnackBar/ErrorSnackBar'
import { Layout } from './components/Header/Layout'
import AppRoutes from './features/Routes/AppRoutes'

const App = () => {
  const isLoading = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(me())
  }, [])

  return (
    // <div className="App">
    //   {isLoading === 'loading' ? <LinearProgress /> : null}
    //   <NavLink style={{ marginRight: '20px' }} to={'/login'}>
    //     LoginPage
    //   </NavLink>
    //   <NavLink style={{ marginRight: '20px' }} to={'/registration'}>
    //     registration
    //   </NavLink>
    //   <NavLink style={{ marginRight: '20px' }} to={'/profile'}>
    //     profile
    //   </NavLink>
    //   <NavLink style={{ marginRight: '20px' }} to={'/errorPage'}>
    //     Error
    //   </NavLink>
    //   <NavLink style={{ marginRight: '20px' }} to={'/passRecovery'}>
    //     passRecovery
    //   </NavLink>
    //   <NavLink style={{ marginRight: '20px' }} to={'/createNewPassword'}>
    //     create new pass
    //   </NavLink>
    //   <NavLink style={{ marginRight: '20px' }} to={'/componentTest'}>
    //     componentTest
    //   </NavLink>
    //   <AppRoutes />
    // </div>
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
