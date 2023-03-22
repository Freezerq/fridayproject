import React from 'react'

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'

import { BasicModal } from '../BasicModal'

export const DeletePackModal = ({ packId, onDeleteHandle, ...props }: DeletePackModalType) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <BasicModal icon={<DeleteSweepIcon />}>
        <h3>efsdf</h3>
      </BasicModal>
    </>
  )
}

type DeletePackModalType = {
  packId: string
  onDeleteHandle: (id: string) => void
}
