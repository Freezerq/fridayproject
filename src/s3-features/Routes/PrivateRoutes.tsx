import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../../s1-DAL/store'

export const PrivateRoutes = () => {
  let isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />
}
