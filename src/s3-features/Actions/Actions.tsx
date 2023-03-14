import React from 'react'

import { PackType } from '../../s1-DAL/packsAPI'
import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { deletePack, updatePack } from '../../s2-BLL/packSlice'

import editIcon from './icons/editIcon.svg'
import studyIcon from './icons/studyIcon.svg'
import trashIcon from './icons/trashIcon.svg'

type ActionsPropsType = {
  onStudyClick: (id: string) => void
  pack: PackType
}

export const Actions = (props: ActionsPropsType) => {
  const userId = useAppSelector(state => state.auth.profile._id)
  const dispatch = useAppDispatch()
  const onEditClick = () => {
    // dispatch(updatePack())
  }
  const onTrashClick = () => {
    // dispatch(deletePack(props.pack._id))
  }

  return (
    <div style={{ marginRight: '14px' }}>
      {props.pack.user_id === userId ? (
        <div>
          <img
            src={studyIcon}
            onClick={() => {
              props.onStudyClick(props.pack._id)
            }}
          />
          <img src={editIcon} />
          <img src={trashIcon} />
        </div>
      ) : (
        <div>
          <img
            src={studyIcon}
            onClick={() => {
              props.onStudyClick(props.pack._id)
            }}
          />
        </div>
      )}
    </div>
  )
}
