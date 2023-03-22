import * as React from 'react'
import { FC, ReactNode } from 'react'

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export const BasicModal: FC<BasicModalPropsType> = ({ children, icon }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <span onClick={handleOpen}>{icon}</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </>
  )
}

type BasicModalPropsType = {
  children: ReactNode
  icon: ReactNode
}
