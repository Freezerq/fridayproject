import React from 'react'

import deleteImg from '../../../s4-components/common/image/delete.svg'
import editImg from '../../../s4-components/common/image/pencil.svg'
import studyImg from '../../../s4-components/common/image/study.svg'

import s from './EditBar.module.scss'

export const EditBar = ({ open, handleClose }: EditBarType) => {
  const editBarClass = s.sidebar + (open ? ' ' + s.open : '')

  return (
    <div>
      {open && <div className={s.background} onClick={handleClose} />}
      <aside className={editBarClass}>
        <div className={s.nav}>
          <div className={s.menu}>
            <div className={s.button} onClick={handleClose}>
              <img src={editImg} className={s.image} />
              Edit
            </div>
            <div className={s.button} onClick={handleClose}>
              <img src={deleteImg} className={s.image} />
              Delete
            </div>
            <div className={s.button} onClick={handleClose}>
              <img src={studyImg} className={s.image} />
              Learn
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

type EditBarType = {
  open: boolean
  handleClose: () => void
}
