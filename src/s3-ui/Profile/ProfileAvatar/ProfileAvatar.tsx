import React, { ChangeEvent } from 'react'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { IconButton } from '@mui/material'
import Avatar from '@mui/material/Avatar'

import defaultAvatar from '../../../assets/img/defaultAvatar.svg'

import s from './ProfileAvatar.module.scss'

import { useAppDispatch, useAppSelector } from 's1-DAL/store'
import { changeProfileImage } from 's2-BLL/authSlice'
import { avatarSelector, convertFileToBase64 } from 's4-common'

export const ProfileAvatar = () => {
  const avatar = useAppSelector(avatarSelector)

  const dispatch = useAppDispatch()

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>, callback: (img: string) => void) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      console.log('file: ', file)

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          callback(file64)
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  const onChangeAvatar = (file64: string) => {
    dispatch(changeProfileImage(file64))
  }

  return (
    <div className={s.container}>
      <Avatar
        src={avatar ? avatar : defaultAvatar}
        style={{ width: '100px', height: '100px' }}
        alt="ava"
      />
      <label>
        <input
          type="file"
          onChange={e => uploadHandler(e, onChangeAvatar)}
          style={{ display: 'none' }}
          accept="image/png, image/jpeg, image/svg"
        />
        <IconButton
          component="span"
          style={{
            position: 'absolute',
            bottom: '-12px',
            right: '-15px',
          }}
        >
          <CloudUploadIcon />
        </IconButton>
      </label>
    </div>
  )
}
