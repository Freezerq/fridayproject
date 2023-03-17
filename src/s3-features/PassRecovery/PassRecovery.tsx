import React, { useState } from 'react'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { getNewToken } from '../../s2-BLL/authSlice'
import { CommonInput } from '../../s4-components/common/CommonInput/CommonInput'
import { SuperButton } from '../../s4-components/common/SuperButton/SuperButton'
import { emailCheck } from '../../utils/regularExpressions'
import { PATH } from '../Routes/AppRoutes'

import style from './PassRecovery.module.scss'

export const PassRecovery = () => {
  const [email, setEmail] = useState('')
  const dispatch = useAppDispatch()
  const isSendedEmail = useAppSelector(state => state.auth.isSendedEmail)
  const appStatus = useAppSelector(state => state.app.status)
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = data => {
    setEmail(data.email)
    dispatch(getNewToken(data.email))
  }

  if (isSendedEmail) {
    navigate(`${PATH.CHECK_EMAIL}/${email}`)
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={style.title}>Forgot your password?</h1>
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

        <p className={style.item}>
          Enter you email adress and we will send you further instructions
        </p>
        <SuperButton
          style={{ marginTop: '60px', letterSpacing: '0.01em', fontSize: '1.3rem' }}
          type="submit"
          disabled={appStatus === 'loading'}
        >
          Submit
        </SuperButton>
        <p>Did you remember you password?</p>

        <NavLink className={style.navLinkSignIn} to={PATH.LOGIN}>
          Try logging in
        </NavLink>
      </form>
    </div>
  )
}

//types
interface FormValues {
  email: string
}
