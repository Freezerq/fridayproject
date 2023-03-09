import React from 'react'

import changePhotoIcon from '../../../components/common/image/camera.svg'
import { SuperButton } from '../../../components/common/SuperButton/SuperButton'
import { UserType } from '../auth-API'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import style from '../Profile.module.scss'
const PersonalInfo = ({ profile, onChangeHandler, logoutHandler }: PersonalInfoPropsTypes) => {
  const avaImage = 'https://vjoy.cc/wp-content/uploads/2019/06/9-29.jpg'

  return (
    <div className={style.form}>
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
      <SuperButton onClick={logoutHandler}>Log out</SuperButton>
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
