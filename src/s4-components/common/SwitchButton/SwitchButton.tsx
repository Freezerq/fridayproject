import React, { FC } from 'react'

import Button from '@mui/material/Button'

type SwitchButtonPropsType = {
  showMyPacks: () => void
  showAllPacks: () => void
}

export const SwitchButton: FC<SwitchButtonPropsType> = ({ showMyPacks, showAllPacks }) => {
  return (
    <div>
      <Button
        type={'button'}
        sx={{
          textTransform: 'none',
          width: '98px',
          height: '36px',
          background: '#366EFF',
        }}
        variant={'contained'}
        onClick={showAllPacks}
      >
        All
      </Button>
      <Button
        type={'button'}
        sx={{
          textTransform: 'none',
          width: '98px',
          height: '36px',
          background: '#366EFF',
        }}
        variant={'contained'}
        onClick={showMyPacks}
      >
        My
      </Button>
    </div>
  )
}
