import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'

import { SuperRange } from '../../s4-components/common/SuperRange/SuperRange'
import { useDebounce } from '../../utils/hooks/hooks'

import s from './FilterPanel.module.css'

export const FilterPanel = (props: FilterPanelType) => {
  const [value, setValue] = useState<string>(props.searchValue ? props.searchValue : '')
  const debouncedValue = useDebounce<string>(value, 750)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    props.onSearchName(value)
  }, [debouncedValue])

  return (
    <div className={s.mainContainer}>
      <div className={s.search}>
        <span className={s.text}>Search</span>
        <Paper
          component="form"
          elevation={0}
          sx={{ background: 'transparent' }}
          className={s.paper}
        >
          <SearchIcon color={'disabled'} sx={{ width: '18px', ml: '5px' }} />
          <InputBase
            className={s.input}
            placeholder="Provide your text"
            inputProps={{ 'aria-label': 'provide your text' }}
            onChange={handleChange}
            value={value}
          />
        </Paper>
      </div>

      <div className={s.container}>
        <span className={s.text}>Show packs cards</span>
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
            onClick={props.showAllPacks}
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
            onClick={props.showMyPacks}
          >
            My
          </Button>
        </div>
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
  searchValue: string | null
  onSearchName: (value: string) => void
}
