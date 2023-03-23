import React, { useEffect, useState } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SubmitHandler, useForm } from 'react-hook-form'

import { PackType, UpdatePackType } from '../../../s1-DAL/packsAPI'
import { BasicModal } from '../BasicModal'

export const EditPackModal = ({ pack, onEditHandle, ...props }: AddPackModalType) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    reset()
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePackType>()

  const onSubmit: SubmitHandler<UpdatePackType> = (data: UpdatePackType) => {
    console.log(data)
    onEditHandle({ ...pack, ...data })

    handleClose()
  }

  return (
    <>
      <BorderColorIcon style={{ marginRight: '8px' }} onClick={handleOpen} />
      <BasicModal open={open} handleClose={handleClose}>
        <Typography variant="h5" component="h2">
          EDIT PACK
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            sx={{ mt: 2, width: '100%' }}
            id="pack-name"
            label="Edit pack's name"
            variant="standard"
            margin="normal"
            defaultValue={pack.name}
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
    </>
  )
}

//types
type AddPackModalType = {
  onEditHandle: (data: UpdatePackType) => void
  pack: PackType
}
