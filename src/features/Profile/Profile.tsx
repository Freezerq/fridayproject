import React, { useCallback, useEffect } from 'react'

import Paper from '@mui/material/Paper'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { PATH } from '../Routes/AppRoutes'

import { changeProfileName, getAuthUserData } from './auth-reducer'
import PersonalInfo from './PersonalInfo/PersonalInfo'
import s from './Profile.module.scss'

export const Profile = React.memo(() => {
  const avaImage = 'https://vjoy.cc/wp-content/uploads/2019/06/9-29.jpg'

  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isAuth)
  const userName = useAppSelector<string>(state => state.auth.name)
  const userEmail = useAppSelector<string>(state => state.auth.email)
  const userAvatar = useAppSelector<string | undefined>(state => state.auth.avatar)

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(getAuthUserData())
    }
  }, [])

  const onNameChangeHandler = useCallback((newName: string) => {
    dispatch(changeProfileName(newName))
  }, [])

  //checking if user is authenticated
  if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />

  return (
    <div>
      <div className={s.segment}>
        <Paper style={{ padding: '10px' }}>
          <PersonalInfo
            avatar={avaImage}
            name={userName}
            email={userEmail}
            onChangeHandler={onNameChangeHandler}
          />
        </Paper>
      </div>
    </div>
  )
})
