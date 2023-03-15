import React from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import SchoolIcon from '@mui/icons-material/School'

import { PackType } from '../../s1-DAL/packsAPI'
import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'

type ActionsPropsType = {
  onStudyClick: (id: string) => void
  pack: PackType
}

export const ActionsForPacks = (props: ActionsPropsType) => {
  const userId = useAppSelector(state => state.auth.profile._id)
  const dispatch = useAppDispatch()
  const onEditClick = () => {
    // dispatch(updatePack({ p }))
  }
  const onTrashClick = () => {
    // dispatch(deletePack(props.pack._id))
  }

  return (
    <div style={{ marginRight: '14px' }}>
      {props.pack.user_id === userId ? (
        <div>
          {props.pack.cardsCount === 0 ? (
            <SchoolIcon style={{ marginRight: '8px' }} color={'disabled'} />
          ) : (
            <SchoolIcon
              style={{ marginRight: '8px' }}
              onClick={() => {
                props.onStudyClick(props.pack._id)
              }}
            />
          )}
          <BorderColorIcon style={{ marginRight: '8px' }} />
          <DeleteSweepIcon />
        </div>
      ) : (
        <div>
          <SchoolIcon
            onClick={() => {
              props.onStudyClick(props.pack._id)
            }}
          />
        </div>
      )}
    </div>
  )
}
