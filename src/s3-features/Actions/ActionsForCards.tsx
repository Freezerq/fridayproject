import React from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import SchoolIcon from '@mui/icons-material/School'
import { Skeleton } from '@mui/material'

import { CardType } from '../../s1-DAL/cardsAPI'
import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { deletePack, updatePack } from '../../s2-BLL/packSlice'

type ActionsPropsType = {
  onStudyClick: (id: string) => void
  card: CardType
}

export const ActionsForCards = (props: ActionsPropsType) => {
  const userId = useAppSelector(state => state.auth.profile._id)
  const appStatus = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()
  const onEditClick = () => {
    // dispatch(upd({ p }))
  }
  const onTrashClick = () => {
    // dispatch(del(props.pack._id))
  }

  if (appStatus === 'loading') {
    return <Skeleton />
  }

  return (
    <div style={{ marginRight: '14px' }}>
      {props.card.user_id === userId ? (
        <div>
          <SchoolIcon
            style={{ marginRight: '8px' }}
            onClick={() => {
              props.onStudyClick(props.card._id)
            }}
          />
          <BorderColorIcon style={{ marginRight: '8px' }} />
          <DeleteSweepIcon />
        </div>
      ) : (
        <div>
          <SchoolIcon
            onClick={() => {
              props.onStudyClick(props.card._id)
            }}
          />
        </div>
      )}
    </div>
  )
}
