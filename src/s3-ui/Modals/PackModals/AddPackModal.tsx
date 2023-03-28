import React, { useState } from 'react'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SubmitHandler, useForm } from 'react-hook-form'

import { AddNewPackType } from '../../../s1-DAL/packsAPI'
import { useAppSelector } from '../../../s1-DAL/store'
import { BasicModal } from '../BasicModal'
import {SuperButton} from "../../../s4-common";

type AddPackModalType = {
  onAddHandle: (data: AddNewPackType) => void
}

export const AddPackModal = ({ onAddHandle, ...props }: AddPackModalType) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    reset()
  }

  const appStatus = useAppSelector(state => state.app.status)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddNewPackType>()

  const onSubmit: SubmitHandler<AddNewPackType> = (data: AddNewPackType) => {
    console.log(data)
    onAddHandle(data)
    reset()
    handleClose()
  }

  return (
    <div>
      <SuperButton
        style={{
          letterSpacing: '0.01em',
          fontSize: '16px',
          width: '175px',
        }}
        onClick={handleOpen}
        disabled={appStatus === 'loading'}
      >
        Add new pack
      </SuperButton>
      <BasicModal open={open} handleClose={handleClose}>
        <Typography variant="h5" component="h2">
          ADD NEW PACK
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            sx={{ mt: 2, width: '100%' }}
            id="pack-name"
            label="Enter pack's name"
            variant="standard"
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name')}
          />
          <Typography>
            <Checkbox id="private-pack" {...register('private')} />
            Private pack
          </Typography>

          <Typography sx={{ mt: 2 }} display={'flex'} justifyContent={'space-between'}>
            <Button variant={'outlined'} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant={'contained'} color={'primary'} type={'submit'}>
              Save
            </Button>
          </Typography>
        </form>
      </BasicModal>
    </div>
  )
}
