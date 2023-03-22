import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../s1-DAL/store'
import { BackToPacksList } from '../../../s4-common/common/BackToPacksList/BackToPacksList'
import { SuperButton } from '../../../s4-common/common/SuperButton/SuperButton'
import { PATH } from '../../Routes/AppRoutes'
import { EditBar } from '../EditBar/EditBar'

import s from './CardsHeader.module.scss'

type CardsHeaderType = {
  packName: string
  onAddNewCard: () => void
  packId: string
}

export const CardsHeader = (props: CardsHeaderType) => {
  const userId = useAppSelector(state => state.auth.profile._id)
  const packUserId = useAppSelector(state => state.cards.cardsData.packUserId)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsData.cardsTotalCount)

  const navigate = useNavigate()

  const onLearnCards = () => {
    navigate(`${PATH.LEARN}/${props.packId}`)
  }

  return (
    <>
      <BackToPacksList />
      <div className={s.headerContainer}>
        <div className={s.header}>
          <span className={s.title}>{props.packName}</span>
          {userId === packUserId && <EditBar packId={props.packId} />}
        </div>
        {userId === packUserId ? (
          <SuperButton
            style={{
              letterSpacing: '0.01em',
              fontSize: '16px',
              width: '175px',
            }}
            onClick={props.onAddNewCard}
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
            onClick={onLearnCards}
          >
            Learn to pack
          </SuperButton>
        )}
      </div>
    </>
  )
}
