import React, { useCallback } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { changeProfileName, logOutTC } from '../../s2-BLL/authSlice'
import { PATH } from '../Routes/AppRoutes'

import PersonalInfo from './PersonalInfo/PersonalInfo'
import style from './Profile.module.scss'

export const Profile = () => {
  const userInfo = useAppSelector(state => state.auth.profile)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(logOutTC())
  }

  const onNameChangeHandler = useCallback((newName: string) => {
    dispatch(changeProfileName(newName))
  }, [])

  //if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />

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
