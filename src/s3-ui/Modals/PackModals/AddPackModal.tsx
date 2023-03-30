import React, { useState, ChangeEvent, SyntheticEvent } from 'react'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SubmitHandler, useForm } from 'react-hook-form'

import { BasicModal } from '../BasicModal'

import defaultCover from 'assets/img/defaultCover.svg'
import { AddNewPackType } from 's1-DAL/packsAPI'
import { useAppSelector } from 's1-DAL/store'
import { convertFileToBase64, SuperButton } from 's4-common'

type AddPackModalPropsType = {
  onAddHandle: (data: AddNewPackType) => void
}

export const AddPackModal = ({ onAddHandle, ...props }: AddPackModalPropsType) => {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<string | undefined>(undefined)

  const appStatus = useAppSelector(state => state.app.status)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setImage(undefined)
    reset()
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddNewPackType>()

  const onSubmit: SubmitHandler<AddNewPackType> = (data: AddNewPackType) => {
    data = { ...data, deckCover: image }

    onAddHandle(data)
    reset()
    setImage(undefined)
    handleClose()
  }

  const imageUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      console.log('file: ', file)

      if (!/^image\//.test(file.type)) {
        alert(`File ${file.name} is not an image.`)

        return false
      }

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          console.log('file64: ', file64)
          setImage(file64)
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
        alert(`File ${file.name} is to large. Should be less then 4 MB`)

        return false
      }
    } else return false
  }

  /**
   * https://stackoverflow.com/a/48222599
   */
  const errorHandler = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null
    event.currentTarget.src = defaultCover
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
          <label>
            <input
              type="file"
              accept="image/*"
              id="deckCover"
              style={{ display: 'none' }}
              {...register('deckCover')}
              onChange={imageUploadHandler}
            />
            <Button variant="outlined" component="span">
              Upload cover picture
            </Button>
          </label>
          {image && (
            <img
              src={image}
              style={{ width: '150px', height: '54px', margin: '10px' }}
              onError={errorHandler}
              alt="packImage"
            />
          )}
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
