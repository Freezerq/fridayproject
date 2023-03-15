import React, { FC, useState } from 'react'

import Button from '@mui/material/Button'

type SwitchButtonPropsType = {
  showMyPacks: () => void
  showAllPacks: () => void
}

export const SwitchButton: FC<SwitchButtonPropsType> = ({ showMyPacks, showAllPacks }) => {
  const [switchOn, setSwitchOn] = useState('All')

  const onAllClick = () => {
    setSwitchOn('All')
    showAllPacks()
  }
  const onMyClick = () => {
    setSwitchOn('My')
    showMyPacks()
  }
  const switchOnStyle = {
    textTransform: 'none',
    width: '98px',
    height: '36px',
    background: '#366EFF',
  }
  const switchOffStyle = {
    textTransform: 'none',
    width: '98px',
    height: '36px',
    background: '#FFF',
    color: '#000',
  }

  return (
    <div>
      <Button
        type={'button'}
        sx={switchOn === 'All' ? switchOnStyle : switchOffStyle}
        variant={'contained'}
        onClick={onAllClick}
      >
        All
      </Button>
      <Button
        type={'button'}
        sx={switchOn === 'My' ? switchOnStyle : switchOffStyle}
        variant={'contained'}
        onClick={onMyClick}
      >
        My
      </Button>
    </div>
  )
}
