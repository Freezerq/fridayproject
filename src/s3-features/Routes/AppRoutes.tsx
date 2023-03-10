import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { Cards } from '../Cards/Cards'
import { ComponentTest } from '../ComponentTest/ComponentTest'
import { CreateNewPassword } from '../CreateNewPassword/CreateNewPassword'
import { ErrorPage } from '../ErrorPage/ErrorPage'
import { Login } from '../Login/Login'
import { Packs } from '../Packs/Packs'
import { PassRecovery } from '../PassRecovery/PassRecovery'
import { Profile } from '../Profile/Profile'
import { Registration } from '../Registration/Registration'

import { PrivateRoutes } from './PrivateRoutes'

export const PATH = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  PROFILE: '/profile',
  ERROR404: '/errorPage',
  PASSWORD_RESTORE: '/passRecovery',
  NEW_PASSWORD: '/set-new-password/:token',
  TEST_SUPER_COMPONENTS: '/componentTest',
  CARDS: '/cards',
  PACKS: '/packs',
  CHECK_EMAIL: '/check-email',
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate to={PATH.LOGIN} />} />

      <Route element={<PrivateRoutes />}>
        <Route path={PATH.PROFILE} element={<Profile />} />
      </Route>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTRATION} element={<Registration />} />
      <Route path={PATH.ERROR404} element={<ErrorPage />} />
      <Route path={PATH.PASSWORD_RESTORE} element={<PassRecovery />} />
      <Route path={PATH.NEW_PASSWORD} element={<CreateNewPassword />} />
      <Route path={PATH.CARDS} element={<Cards />} />
      <Route path={PATH.PACKS} element={<Packs />} />

      <Route path={PATH.TEST_SUPER_COMPONENTS} element={<ComponentTest />} />

      <Route path={'/*'} element={<ErrorPage />} />
    </Routes>
  )
}

export default AppRoutes
