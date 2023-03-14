import React, { SyntheticEvent, useEffect, useState } from 'react'

import Slider from '@mui/material/Slider'

import { useAppDispatch, useAppSelector } from '../../../s1-DAL/store'
import { setPacksAttributes } from '../../../s2-BLL/packSlice'

import s from './SuperRange.module.css'

export const SuperRange = () => {
  const maxValue = useAppSelector(state => state.packs.packsData.maxCardsCount)
  const minValue = useAppSelector(state => state.packs.packsData.minCardsCount)
  const dispatch = useAppDispatch()
  const [value1, setValue1] = useState(minValue)
  const [value2, setValue2] = useState(maxValue)

  const change = (event: SyntheticEvent | Event, value: number | Array<number>) => {
    if (Array.isArray(value)) {
      setValue1(value[0])
      dispatch(setPacksAttributes({ attributes: { min: value[0] } }))
      setValue2(value[1])
      dispatch(setPacksAttributes({ attributes: { max: value[1] } }))
    } else {
      return setValue1(value)
    }
  }

  useEffect(() => {
      setValue1(minValue)
      setValue2(maxValue)
  }, [maxValue, minValue])

  return (
    <div className={s.wrapper}>
      <span className={s.number}>{value1}</span>
      <Slider
        sx={{
          color: '#366EFF',
          height: '5px',
          width: '155px',

          '& .MuiSlider-thumb': {
            height: 18,
            width: 18,
            border: 'solid 5px white',
            outline: 'solid 2px #366EFF',
          },
        }}
        onChangeCommitted={change}
        value={[value1, value2]}
      />
      <span className={s.number}>{value2}</span>
    </div>
  )
}
