import React from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import SchoolIcon from '@mui/icons-material/School'
import { Skeleton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { PackType, UpdatePackType } from '../../s1-DAL/packsAPI'
import { appStatusSelector } from '../../s4-common/selectors/appSelectors'
import { userIdSelector } from '../../s4-common/selectors/authSelectors'
import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { DeletePackModal } from '../Modals/PackModals/DeletePackModal'
import { EditPackModal } from '../Modals/PackModals/EditPackModal'
import { PATH } from '../Routes/AppRoutes'

type ActionsPropsType = {
  pack: PackType
  onDeletePackHandle: (id: string) => void
  onEditPackHandle: (data: UpdatePackType) => void
}

export const ActionsForPacks = ({
  pack,
  onDeletePackHandle,
  onEditPackHandle,
  ...props
}: ActionsPropsType) => {
  const userId = useAppSelector(userIdSelector)
  const appStatus = useAppSelector(appStatusSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onStudyClick = (packId: string) => {
    navigate(`${PATH.LEARN}/${packId}`)
  }

  if (appStatus === 'loading') {
    return <Skeleton />
  }

  return (
    <div style={{ marginRight: '14px' }}>
      {pack.cardsCount === 0 ? (
        <SchoolIcon style={{ marginRight: '8px' }} color={'disabled'} />
      ) : (
        <SchoolIcon style={{ marginRight: '8px' }} onClick={() => onStudyClick(pack._id)} />
      )}
      {pack.user_id === userId && (
        <>
          <EditPackModal onEditHandle={onEditPackHandle} pack={pack} />
          <DeletePackModal pack={pack} onDeleteHandle={onDeletePackHandle} />
        </>
      )}
    </div>
  )
}
