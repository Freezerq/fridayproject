import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import { FieldValues, UseFormRegister } from 'react-hook-form'

import style from './commonInput.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  UseFormReturn

export type UseFormReturn<TFieldValues extends FieldValues = FieldValues, TContext = any> = {
  register: UseFormRegister<TFieldValues>
}

export const InputTest = (props: DefaultInputPropsType) => {
  const { name, register, ...restProps } = props

  //{...register(`${props.name}`)}
  return (
    <div className={style.form__group}>
      <input
        type="input"
        className={style.form__field}
        placeholder={name}
        id={name}
        {...register(`${props.name}`)}
        required
        autoComplete={'off'}
        {...restProps}
      />
      <label htmlFor={name} className={style.form__label}>
        {name}
      </label>
    </div>
  )
}
