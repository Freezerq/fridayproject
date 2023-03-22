import React from 'react'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { PackType } from '../../../s1-DAL/packsAPI'
import { BasicModal } from '../BasicModal'

export const DeletePackModal = ({ pack, onDeleteHandle, ...props }: DeletePackModalType) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
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
      <Button>Delete</Button>
    </BasicModal>
  )
}

type DeletePackModalType = {
  pack: PackType
  onDeleteHandle: (id: string) => void
}
