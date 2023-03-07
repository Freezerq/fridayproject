import React from 'react'

import { SuperButton } from '../../../components/common/SuperButton/SuperButton'

import s from './PersonalInfo.module.scss'

const PersonalInfo = () => {
  return (
    <div className={s.segment}>
      <div className={s.infoContainer}>
        <div className={s.title}>Personal Information</div>
        <div className={s.image}></div>
        <div className={s.name}></div>
        <div className={s.email}>j.johnson@gmail.com</div>
        <div className={s.changeButton}>
          <SuperButton>Log out</SuperButton>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo
