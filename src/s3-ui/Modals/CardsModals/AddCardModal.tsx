import React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Controller, useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

import { useAppDispatch } from '../../../s1-DAL/store'
import { addNewCard } from '../../../s2-BLL'
import { SuperButton } from '../../../s4-common'

type AddCardModalPropsType = {
  pack_id: string
  handleClose: () => void
}

export type AddCardType = {
  selectValue: string
  question: string
  answer: string
}

const options = ['Text', 'Image']

export const AddCardModal = (props: AddCardModalPropsType) => {
  const dispatch = useAppDispatch()
  const { search } = useLocation()
  const paramsFromUrl = Object.fromEntries(new URLSearchParams(search))
  const handleOpen = () => {
    submitFunc(getValues())
    props.handleClose()
  }

  const { control, getValues, reset } = useForm<AddCardType>({
    defaultValues: { selectValue: options[0], question: '', answer: '' },
  })

  const submitFunc = (data: AddCardType) => {
    dispatch(
      addNewCard(
        { ...data, cardsPack_id: props.pack_id },
        { cardsPack_id: props.pack_id, ...paramsFromUrl }
      )
    )
    reset({ selectValue: options[0], question: '', answer: '' })
  }

  return (
    <div
      style={{
        width: '400px',
        height: '400px',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '347px',
        }}
      >
        <Typography>Add new card</Typography>
        <CloseIcon onClick={props.handleClose} />
      </div>

      <div
        style={{
          height: '190px',
          width: '347px',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <div>
          <div>Choose a question format</div>
          <Controller
            render={({ field }) => (
              <Select sx={{ width: '100%', height: '36px' }} {...field}>
                {options.map((option, index) => (
                  <MenuItem key={index} sx={{ width: '347px', height: '36px' }} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            )}
            name="selectValue"
            control={control}
          />
        </div>
        <div>
          <div>Question</div>
          <div>
            <Controller
              control={control}
              name="question"
              render={({ field: { onChange, value } }) => (
                <TextField
                  style={{ width: '100%' }}
                  variant="standard"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>
        <div>
          <div>Answer</div>
          <div>
            <Controller
              control={control}
              name="answer"
              render={({ field: { onChange, value } }) => (
                <TextField
                  style={{ width: '100%' }}
                  variant="standard"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>
      </div>
      <SuperButton onClick={handleOpen}>Add new card</SuperButton>
    </div>
  )
}
