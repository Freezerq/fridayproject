import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import deleteImg from '../../../s4-common/images/delete.svg'
import moreVertical from '../../../s4-common/images/more-vertical.svg'
import editImg from '../../../s4-common/images/pencil.svg'
import studyImg from '../../../s4-common/images/study.svg'
import { PATH } from '../../Routes/AppRoutes'

import s from './EditBar.module.scss'

export const EditBar = ({ packId }: EditBarType) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const editBarClass = s.sidebar + (open ? ' ' + s.open : '')

  const navigate = useNavigate()
  const onLearnClickHandler = () => {
    handleClose()
    navigate(`${PATH.LEARN}/${packId}`)
  }

  return (
    <div className={s.popUpBar}>
      <img src={moreVertical} alt={'open menu'} onClick={handleOpen} className={s.moreImg} />

      {open && <div className={s.background} onClick={handleClose} />}

      <aside className={editBarClass}>
        <div className={s.nav}>
          <div className={s.menu}>
            <div className={s.button} onClick={handleClose}>
              <img src={editImg} className={s.image} alt={'editImg'} />
              Edit
            </div>
            <div className={s.button} onClick={handleClose}>
              <img src={deleteImg} className={s.image} alt={'deleteImg'} />
              Delete
            </div>
            <div className={s.button} onClick={onLearnClickHandler}>
              <img src={studyImg} className={s.image} alt={'stydyImg'} />
              Learn
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

type EditBarType = {
  packId: string
}
