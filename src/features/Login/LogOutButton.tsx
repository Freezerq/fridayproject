import React from 'react'

import { useAppDispatch } from '../../app/store'
import logOutIcon from '../../components/common/image/logout.svg'
import { SuperButton } from '../../components/common/SuperButton/SuperButton'

import { logOutTC } from './loginReducer'
import style from './LogOutButton.module.scss'

export const LogOutButton = () => {
  const dispatch = useAppDispatch()

  const logOut = () => {
    dispatch(logOutTC())
  }

  return (
    <div className={style.container}>
      <SuperButton
        onClick={logOut}
        style={{
          backgroundColor: 'white',
          padding: 0,
          width: '100%',
          color: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: '500',
        }}
      >
        <img src={logOutIcon} className={style.svg} />
        <div>Log out</div>
      </SuperButton>
    </div>
  )
}
