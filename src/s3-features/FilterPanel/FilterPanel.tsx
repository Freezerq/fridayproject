import React, { ChangeEvent, FC, useState } from 'react'

import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'

import { SuperRange } from '../../s4-components/common/SuperRange/SuperRange'
import { useDebounce } from '../../utils/hooks/hooks'

import s from './FilterPanel.module.css'

export const FilterPanel = (props: FilterPanelType) => {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

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
        <SuperRange />
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
        <FilterAltIcon />
      </Button>
    </div>
  )
}

type FilterPanelType = {
  showMyPacks: () => void
  showAllPacks: () => void
  resetFilters: () => void
}
