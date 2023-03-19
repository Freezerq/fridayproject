import React from 'react'

import { NavLink } from 'react-router-dom'

import { UserType } from '../../../s1-DAL/authAPI'
import { SuperButton } from '../../../s4-common/common/SuperButton/SuperButton'
import changePhotoIcon from '../../../s4-common/images/camera.svg'
import { LogOutButton } from '../../Login/LogOutButton'
import { PATH } from '../../Routes/AppRoutes'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import style from '../Profile.module.scss'

const PersonalInfo = ({ profile, onChangeHandler, ...props }: PersonalInfoPropsTypes) => {
  const avaImage = 'https://vjoy.cc/wp-content/uploads/2019/06/9-29.jpg'

  return (
    <div className={style.form}>
      <NavLink to={PATH.PACKS}>
        <SuperButton className={style.button}>Open packs</SuperButton>
      </NavLink>

      <h2 className={style.title}>Personal Information</h2>
      <div className={style.image}>
        <img src={avaImage} className={style.avatar} />
        <div className={style.camera}>
          <img src={changePhotoIcon} alt={'change profile picture'} />
        </div>
      </div>
      <div className={style.name}>
        <EditableSpan value={profile.name} onChange={onChangeHandler} />
      </div>
      <div className={style.email}>{profile.email}</div>
      <LogOutButton />
    </div>
  )
}

export default PersonalInfo

//types
type PersonalInfoPropsTypes = {
  profile: UserType
  onChangeHandler: (newName: string) => void
  logoutHandler: () => void
}
