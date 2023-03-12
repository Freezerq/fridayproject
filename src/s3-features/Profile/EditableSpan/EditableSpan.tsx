import React, { ChangeEvent, useState } from 'react'

import TextField from '@mui/material/TextField'

import pencil from '../../../s4-components/common/image/pencil.svg'

import s from './EditableSpan.module.scss'

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
  console.log('EditableSpan called')
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState(props.value)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.value)
  }
  const activateViewMode = () => {
    setEditMode(false)
    if (title.trim() !== '') props.onChange(title.trim())
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode ? (
    <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
  ) : (
    <span onDoubleClick={activateEditMode}>
      {props.value}
      <img src={pencil} className={s.pen} alt={'change name'} />
    </span>
  )
})
