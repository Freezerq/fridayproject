import React from 'react'

import { EditableSpan } from '../EditableSpan/EditableSpan'
import s from '../Profile.module.scss'

const PersonalInfo = ({ avatar, name, email, onChangeHandler }: PersonalInfoPropsTypes) => {
  return (
    <div className={s.infoContainer}>
      <h2>Personal Information</h2>
      <div className={s.image}>
        {/*<img src={userAvatar ? userAvatar : avaImage}/>*/}
        <img src={avatar} className={s.avatar} />
        <div className={s.camera}>
          <img src={'../image/camera.svg'} alt={'change profile picture'} />
        </div>
      </div>
      <div className={s.name}>
        <EditableSpan value={name} onChange={onChangeHandler} />
      </div>
      <div className={s.email}>{email}</div>
      <div className={s.changeButton}>
        <button>Log out</button>
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
