import React, { useState } from 'react'

import Slider from '@mui/material/Slider'

import s from './SuperRange.module.css'

export const SuperRange = () => {
  // for autotests // не менять // можно подсунуть в локалСторэдж нужные числа, чтоб увидеть как они отображаются
  const [value1, setValue1] = useState(0)
  const [value2, setValue2] = useState(100)

  const change = (event: Event, value: number | Array<number>) => {
    if (Array.isArray(value)) {
      setValue1(value[0])
      setValue2(value[1])
    } else {
      return setValue1(value)
    }
    // пишет студент // если пришёл массив - сохранить значения в оба useState, иначе в первый
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
        onChange={change}
        value={[value1, value2]}
      />
      <span className={s.number}>{value2}</span>
    </div>
  )
}
