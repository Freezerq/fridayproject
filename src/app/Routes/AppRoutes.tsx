import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { Cards } from '../../s3-features/Cards/Cards'
import { ComponentTest } from '../../s3-features/ComponentTest/ComponentTest'
import { CreateNewPassword } from '../../s3-features/CreateNewPassword/CreateNewPassword'
import { ErrorPage } from '../../s3-features/ErrorPage/ErrorPage'
import { Learn } from '../../s3-features/Learn/Learn'
import { Login } from '../../s3-features/Login/Login'
import { Packs } from '../../s3-features/Packs/Packs'
import { CheckEmail } from '../../s3-features/PassRecovery/checkEmail/CheckEmail'
import { PassRecovery } from '../../s3-features/PassRecovery/PassRecovery'
import { Profile } from '../../s3-features/Profile/Profile'
import { Registration } from '../../s3-features/Registration/Registration'

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
  LEARN: '/learn',
} as const

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
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={PATH.LEARN + '/:packId'} element={<Learn />} />

      <Route path={PATH.TEST_SUPER_COMPONENTS} element={<ComponentTest />} />

      <Route path={'/*'} element={<ErrorPage />} />
    </Routes>
  )
}

export default AppRoutes
