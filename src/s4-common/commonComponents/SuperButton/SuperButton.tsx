import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './SuperButton.module.scss'

// тип пропсов обычной кнопки, children в котором хранится название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: string
}

export const SuperButton: React.FC<SuperButtonPropsType> = ({
  xType,
  className,
  disabled,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
  const finalClassName =
    s.button +
    (disabled ? ' ' + s.disabled : '') +
    (xType === 'red' ? ' ' + s.red : '') +
    (xType === 'secondary' ? ' ' + s.secondary : ' ' + s.default) +
    (className ? ' ' + className : '')

  return (
    <button
      style={{ textAlign: 'center' }}
      disabled={disabled}
      className={finalClassName}
      {...restProps}
    />
  )
}
