import React from 'react'

import { useAppDispatch } from '../../s1-DAL/store'
import { logOutTC } from '../../s2-BLL/loginSlice'
import logOutIcon from '../../s4-components/common/image/logout.svg'
import { SuperButton } from '../../s4-components/common/SuperButton/SuperButton'

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
