import React from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { ActionsForPack } from '../../Actions/ActionsForPack'

export const EditBar = ({
  packId,
  packName,
  cardsTotalCount,
  packUserId,
  ...props
}: EditBarType) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000',
      },
    },
  })

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <ThemeProvider theme={theme}>
      <IconButton aria-describedby={id} onClick={handleOpen} color={'primary'}>
        <MoreVertIcon style={{ marginRight: '4px' }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ActionsForPack
          packId={packId}
          packName={packName}
          totalCardsInPack={cardsTotalCount}
          id={packUserId}
          hasText
        />
      </Popover>
    </ThemeProvider>
  )
}

type EditBarType = {
  packId: string
  packName: string
  cardsTotalCount: number
  packUserId: string
}