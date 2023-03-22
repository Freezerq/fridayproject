import React, { useState } from 'react'

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { PackType } from '../../../s1-DAL/packsAPI'
import { BasicModal } from '../BasicModal'

export const DeletePackModal = ({ pack, onDeleteHandle, ...props }: DeletePackModalType) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <DeleteSweepIcon onClick={handleOpen} />
      <BasicModal open={open} handleClose={handleClose}>
        <Typography id="modal-title" variant="h5" component="h2">
          DELETE PACK
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          <div>
            Do you really want to remove <b>{pack.name}</b>?
          </div>
          <div>All cards will be deleted</div>
        </Typography>
        <Typography sx={{ mt: 2 }} display={'flex'} justifyContent={'space-between'}>
          <Button variant={'contained'} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant={'contained'} color={'error'} onClick={() => onDeleteHandle(pack._id)}>
            Delete
          </Button>
        </Typography>
      </BasicModal>
    </>
  )
}

type DeletePackModalType = {
  pack: PackType
  onDeleteHandle: (id: string) => void
}
