import { userInfo } from 'os'

import React, { useCallback, useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { logOutTC } from '../Login/loginReducer'
import { PATH } from '../Routes/AppRoutes'

import { changeProfileName, getAuthUserData } from './auth-reducer'
import PersonalInfo from './PersonalInfo/PersonalInfo'
import style from './Profile.module.scss'

export const Profile = () => {
  const userInfo = useAppSelector(state => state.auth.profile)
  const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(logOutTC())
  }

  useEffect(() => {
    dispatch(getAuthUserData())
  }, [])

  const onNameChangeHandler = useCallback((newName: string) => {
    dispatch(changeProfileName(newName))
  }, [])

  if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />

  return (
    <div>
      <div className={style.container}>
        <PersonalInfo
          profile={userInfo}
          onChangeHandler={onNameChangeHandler}
          logoutHandler={logoutHandler}
        />
      </div>
    </div>
  )
}
