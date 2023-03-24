import React, { useState } from 'react'

import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../app/Routes/AppRoutes'
import { AddNewCardType } from '../../../s1-DAL/cardsAPI'
import { useAppSelector } from '../../../s1-DAL/store'
import { BackToPacksList } from '../../../s4-common/common/BackToPacksList/BackToPacksList'
import { SuperButton } from '../../../s4-common/common/SuperButton/SuperButton'
import { userIdSelector } from '../../../s4-common/selectors/authSelectors'
import {
  cardsTotalCountSelector,
  packUserIdSelector,
} from '../../../s4-common/selectors/cardsSelectors'
import { BasicModal } from '../../Modals/BasicModal'
import { AddCardModal } from '../../Modals/CardsModals/AddCardModal'
import { EditBar } from '../EditBar/EditBar'

import s from './CardsHeader.module.scss'

type CardsHeaderType = {
  packName: string
  onAddNewCard: (data: AddNewCardType) => void
  packId: string
}

export const CardsHeader = (props: CardsHeaderType) => {
  const userId = useAppSelector(userIdSelector)
  const packUserId = useAppSelector(packUserIdSelector)
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)

  const navigate = useNavigate()

  const onLearnCards = () => {
    navigate(`${PATH.LEARN}/${props.packId}`)
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <BackToPacksList />
      <div className={s.headerContainer}>
        <div className={s.header}>
          <Typography className={s.title}>{props.packName}</Typography>
          {userId === packUserId && (
            <EditBar
              packId={props.packId}
              packName={props.packName}
              cardsTotalCount={cardsTotalCount}
              packUserId={packUserId}
            />
          )}
        </div>
        {userId === packUserId ? (
          <SuperButton
            style={{
              letterSpacing: '0.01em',
              fontSize: '16px',
              width: '175px',
            }}
            onClick={handleOpen}
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
      <BasicModal handleClose={handleClose} open={open}>
        <AddCardModal pack_id={props.packId} handleClose={handleClose} />
      </BasicModal>
    </>
  )
}
