import React, { ChangeEvent, useEffect, useState } from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'

import { SearchField } from '../../s4-components/common/SearchField/SearchField'
import { SuperRange } from '../../s4-components/common/SuperRange/SuperRange'
import { SwitchButton } from '../../s4-components/common/SwitchButton/SwitchButton'

import s from './FilterPanel.module.css'

export const FilterPanel = (props: FilterPanelType) => {
  return (
    <div className={s.mainContainer}>
      <div className={s.container}>
        <span className={s.text}>Show packs cards</span>
        <SwitchButton showMyPacks={props.showMyPacks} showAllPacks={props.showAllPacks} />
      </div>

      <div className={s.container}>
        <span className={s.text}>Number of cards</span>
        <SuperRange
          min={props.minSearchCardsNumber}
          max={props.maxSearchCardsNumber}
          maxValue={props.maxCardsValue}
          setToUrlCardValues={props.onChangeSlider}
        />
      </div>

      <Button
        sx={{
          width: '40px',
          height: '36px',
          background: '#E8E8E8',
        }}
        type={'button'}
        variant={'outlined'}
        onClick={props.resetFilters}
      >
        <FilterAltOffIcon />
      </Button>
    </div>
  )
}

type FilterPanelType = {
  minSearchCardsNumber: number
  maxSearchCardsNumber: number
  maxCardsValue: number
  showMyPacks: () => void
  showAllPacks: () => void
  resetFilters: () => void
  onChangeSlider: (min: number, max: number) => void
}
