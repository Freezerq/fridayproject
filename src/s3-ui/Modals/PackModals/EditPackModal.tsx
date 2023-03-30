import React, { ChangeEvent, SyntheticEvent, useState } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SubmitHandler, useForm } from 'react-hook-form'

import { BasicModal } from '../BasicModal'

import defaultCover from 'assets/img/defaultCover.svg'
import { UpdatePackType } from 's1-DAL/packsAPI'
import { convertFileToBase64 } from 's4-common'

type AddPackModalType = {
  onEditHandle: (data: UpdatePackType) => void
  packId: string
  packName: string
  hasText?: boolean
  packCover: string | undefined
}

export const EditPackModal = ({
  packId,
  packName,
  onEditHandle,
  packCover,
  ...props
}: AddPackModalType) => {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<string | undefined>(packCover ? packCover : undefined)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setImage(packCover)
    reset()
  }

  const { register, handleSubmit, reset } = useForm<UpdatePackType>()

  const onSubmit: SubmitHandler<UpdatePackType> = (data: UpdatePackType) => {
    data = { ...data, deckCover: image }
    onEditHandle({ ...data, _id: packId })

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
    <>
      <IconButton color={'primary'} onClick={handleOpen}>
        <BorderColorIcon style={{ marginRight: '4px' }} />
        {props.hasText && <span>Edit</span>}
      </IconButton>

      <BasicModal open={open} handleClose={handleClose}>
        <Typography variant="h5" component="h2">
          EDIT PACK
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
            label="Edit pack's name"
            variant="standard"
            margin="normal"
            defaultValue={packName}
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
