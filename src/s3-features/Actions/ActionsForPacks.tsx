import React from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import SchoolIcon from '@mui/icons-material/School'
import { Skeleton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { PackType } from '../../s1-DAL/packsAPI'
import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { PATH } from '../Routes/AppRoutes'

type ActionsPropsType = {
  pack: PackType
  packId: string
  onDeletePackHandle: (id: string) => void
}

export const ActionsForPacks = (props: ActionsPropsType) => {
  const userId = useAppSelector(state => state.auth.profile._id)
  const appStatus = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onEditClick = () => {
    // dispatch(updatePack({ p }))
  }
  const onTrashClick = () => {
    // dispatch(deletePack(props.pack._id))
  }
  const onStudyClick = (packId: string) => {
    navigate(`${PATH.LEARN}/${packId}`)
  }

  if (appStatus === 'loading') {
    return <Skeleton />
  }

  return (
    <div style={{ marginRight: '14px' }}>
      {props.pack.cardsCount === 0 ? (
        <SchoolIcon style={{ marginRight: '8px' }} color={'disabled'} />
      ) : (
        <SchoolIcon style={{ marginRight: '8px' }} onClick={() => onStudyClick(props.pack._id)} />
      )}
      {props.pack.user_id === userId && (
        <>
          <BorderColorIcon style={{ marginRight: '8px' }} />
          <DeleteSweepIcon
            onClick={() => {
              props.onDeletePackHandle(props.pack._id)
            }}
          />
        </>
      )}
    </div>
  )
}
