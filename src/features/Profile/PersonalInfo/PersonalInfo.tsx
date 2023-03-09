import React from 'react'

import { LogOutButton } from '../../Login/LogOutButton'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import cameraPhoto from '../image/camera.svg'
import s from '../Profile.module.css'

const PersonalInfo = ({ avatar, name, email, onChangeHandler }: PersonalInfoPropsTypes) => {
  return (
    <div className={s.infoContainer}>
      <h2>Personal Information</h2>
      <div className={s.image}>
        {/*<img src={userAvatar ? userAvatar : avaImage}/>*/}
        <img src={avatar} className={s.avatar} />
        <div className={s.camera}>
          <img src={cameraPhoto} alt={'change profile picture'} />
        </div>
      </div>
      <div className={s.name}>
        <EditableSpan value={name} onChange={onChangeHandler} />
      </div>
      <div className={s.email}>{email}</div>
      <div>
        <LogOutButton />
      </div>
    </div>
  )
}

export default PersonalInfo

//types
type PersonalInfoPropsTypes = {
  avatar: string
  name: string
  email: string
  onChangeHandler: (newName: string) => void
}
