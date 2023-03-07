import React, { useEffect, useState } from 'react'

import { useForm, Controller } from 'react-hook-form'
import { NavLink } from 'react-router-dom'

import { useAppDispatch } from '../../app/store'
import { CommonInput } from '../../components/common/CommonInput/CommonInput'
import { SuperButton } from '../../components/common/SuperButton/SuperButton'
import { emailCheck } from '../Registration/Registration'
import style from '../Registration/registration.module.scss'

type FormValues = {
  email: string
}

export const PassRecovery = () => {
  const dispatch = useAppDispatch()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>()

  const submitFunc = (data: FormValues) => {
    console.log(data)
    // dispatch(registrationThunk({ email: data.email, password: data.password }))
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit(submitFunc)} style={{ height: '456px' }}>
        <h1 className={style.Title}>Sign Up</h1>
        <Controller
          rules={{
            pattern: {
              value: emailCheck,
              message: 'Email is not valid',
            },
            required: 'Field is required',
            maxLength: { value: 30, message: 'Maximum length of email is 30 symbols' },
          }}
          control={control}
          name="email"
          render={({ field: { onChange } }) => (
            <div className={style.item}>
              <CommonInput
                autoComplete={'email'}
                onChange={onChange} // send value to hook form
                error={errors.email?.message}
                fieldname={'Email'}
              />
            </div>
          )}
        />
        <div className={style.emailRecoveryText}>
          Enter your email address and we will send you further instructions
        </div>
        <SuperButton
          style={{ marginTop: '65px', letterSpacing: '0.01em', fontSize: '1.3rem' }}
          type="submit"
        >
          Send Instructions
        </SuperButton>
        <div className={style.rememberPasswordText}>Did you remember your password?</div>
        <NavLink className={style.navLinkSignIn} to={'/login'} style={{ marginTop: '11px' }}>
          Try logging in
        </NavLink>
      </form>
    </div>
  )
}
