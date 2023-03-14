import React, { SyntheticEvent, useEffect, useState } from 'react'

import Slider from '@mui/material/Slider'

import s from './SuperRange.module.css'

export const SuperRange = (props: SuperRangeType) => {
  const [value1, setValue1] = useState(props.min)
  const [value2, setValue2] = useState(props.maxValue)

  const changeValues = (event: SyntheticEvent | Event, value: number | Array<number>) => {
    if (Array.isArray(value)) {
      setValue1(value[0])
      setValue2(value[1])
    } else {
      return setValue1(value)
    }
  }

  useEffect(() => {
    setValue1(props.min)
    if (props.max) {
      setValue2(props.max)
    } else {
      setValue2(props.maxValue)
    }
  }, [props.maxValue, props.min, props.max])

  const setValuesToUrl = () => {
    props.setToUrlCardValues(value1, value2)
  }

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
        onChange={changeValues}
        onChangeCommitted={setValuesToUrl}
        value={[value1, value2]}
      />
      <span className={s.number}>{value2}</span>
    </div>
  )
}

type SuperRangeType = {
  min: number
  max: number
  setToUrlCardValues: (min: number, max: number) => void
  maxValue: number
}
