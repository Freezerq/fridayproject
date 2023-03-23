import React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Controller, useForm } from 'react-hook-form'

import { CardType } from '../../../s1-DAL/cardsAPI'
import { useAppDispatch } from '../../../s1-DAL/store'
import { addNewCard, deleteCard, updateCard } from '../../../s2-BLL/cardsSlice'
import { SuperButton } from '../../../s4-common/common/SuperButton/SuperButton'

type AddCardModalPropsType = {
  card: CardType
  handleClose: () => void
}

export const DeleteCardModal = (props: AddCardModalPropsType) => {
  const dispatch = useAppDispatch()
  const onButtonClickHandler = () => {
    dispatch(deleteCard(props.card._id, { cardsPack_id: props.card.cardsPack_id }))
    props.handleClose()
  }

  return (
    <div
      style={{
        height: '240px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          fontFamily: 'Montserrat',
          fontWeight: '500',
          fontSize: '22px',
          lineHeight: '22px',
        }}
      >
        Delete Card
      </div>
      <div>
        <div style={{ marginBottom: '3px' }}>
          Do you really want to remove <b>{props.card.question}</b> ?
        </div>
        <div>Card will be deleted</div>
      </div>
      <SuperButton
        onClick={onButtonClickHandler}
        style={{ alignSelf: 'center', width: '200px', backgroundColor: 'red' }}
      >
        Delete card
      </SuperButton>
    </div>
  )
}
