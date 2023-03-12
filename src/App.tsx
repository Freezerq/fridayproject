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
