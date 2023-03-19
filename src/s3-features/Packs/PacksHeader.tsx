import React, { FC, useState } from 'react'

import { useAppSelector } from '../../s1-DAL/store'
import { SuperButton } from '../../s4-common/common/SuperButton/SuperButton'
import moreVertical from '../../s4-common/images/more-vertical.svg'

import { EditBar } from './editBar/EditBar'
import s from './Packs.module.scss'

type PackHeaderType = {
  buttonOnClick: () => void
}

export const PacksHeader: FC<PackHeaderType> = ({ buttonOnClick }) => {
  const appStatus = useAppSelector(state => state.app.status)
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  return (
    <div className={s.headerContainer}>
      <div className={s.header}>
        <div className={s.titleBlock}>
          <span className={s.title}>Packs list</span>
          <div className={s.popUpBar}>
            <img src={moreVertical} alt={'open menu'} onClick={handleOpen} className={s.moreImg} />
            <EditBar open={open} handleClose={handleClose} />
          </div>
        </div>

        <SuperButton
          style={{
            letterSpacing: '0.01em',
            fontSize: '16px',
            width: '175px',
          }}
          onClick={buttonOnClick}
          disabled={appStatus === 'loading'}
        >
          Add new pack
        </SuperButton>
      </div>
    </div>
  )
}
