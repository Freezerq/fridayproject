import React, { FC } from 'react'

import { useAppSelector } from '../../../s1-DAL/store'
import { SuperButton } from '../../../s4-common/common/SuperButton/SuperButton'

import s from './PacksHeader.module.scss'

type PackHeaderType = {
  buttonOnClick: () => void
}

export const PacksHeader: FC<PackHeaderType> = ({ buttonOnClick }) => {
  const appStatus = useAppSelector(state => state.app.status)

  return (
    <div className={s.headerContainer}>
      <div className={s.header}>
        <div className={s.titleBlock}>
          <span className={s.title}>Packs list</span>
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
