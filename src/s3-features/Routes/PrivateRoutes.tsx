import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../../s1-DAL/store'

import { PATH } from './AppRoutes'

export const PrivateRoutes = () => {
  let isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
