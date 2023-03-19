import * as React from 'react'
import { FC, ReactNode } from 'react'

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

export const BasicModal: FC<BasicModalPropsType> = ({ children, open, handleClose }) => {
  return (
    <div>
      <Button>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  )
}

type BasicModalPropsType = {
  children: ReactNode
  open: boolean
  handleClose: () => void
}
