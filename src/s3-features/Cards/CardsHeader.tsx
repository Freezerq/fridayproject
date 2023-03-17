import React from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../s1-DAL/store'
import { SuperButton } from '../../s4-components/common/SuperButton/SuperButton'
import { PATH } from '../Routes/AppRoutes'

import s from './Cards.module.scss'

type CardsHeaderType = {
  packName: string
}

export const CardsHeader = (props: CardsHeaderType) => {
  const userId = useAppSelector(state => state.auth.profile._id)
  const packUserId = useAppSelector(state => state.cards.cardsData.packUserId)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsData.cardsTotalCount)
  const navigate = useNavigate()
  const buttonBackOnClick = () => {
    navigate(PATH.PACKS)
  }

  return (
    <>
      <div style={{ display: 'flex', margin: '15px', alignItems: 'center' }}>
        <ArrowBackIcon onClick={buttonBackOnClick} />
        <span>Back to Packs List</span>
      </div>
      <div className={s.headerContainer}>
        <div className={s.header}>
          <span className={s.title}>{props.packName}</span>
          {userId === packUserId ? (
            <SuperButton
              style={{
                letterSpacing: '0.01em',
                fontSize: '16px',
                width: '175px',
              }}
            >
              Add new card
            </SuperButton>
          ) : (
            <SuperButton
              style={{
                letterSpacing: '0.01em',
                fontSize: '16px',
                width: '175px',
              }}
              disabled={cardsTotalCount === 0}
            >
              Learn to pack
            </SuperButton>
          )}
        </div>
      </div>
    </>
  )
}
