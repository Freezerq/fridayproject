import React from 'react'

import style from './commonInput.module.scss'

type CommonInputType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { error?: string; fieldname: string }

export const CommonInput = (props: CommonInputType) => {
  return (
    <div className={style.form__group}>
      <input {...props} placeholder={props.fieldname} className={style.form__field} />
      <label htmlFor={props.fieldname} className={style.form__label}>
        {props.fieldname}
      </label>
      <div>{props.error ? props.error : ''}</div>
    </div>
  )
}
