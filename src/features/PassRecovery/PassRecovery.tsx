import React from 'react'

import Paper from '@mui/material/Paper'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'

import { useAppDispatch } from '../../app/store'
import { getNewToken } from '../Profile/auth-reducer'
import { PATH } from '../Routes/AppRoutes'

import s from './PassRecovery.module.css'

export const PassRecovery = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      restoreEmail: '',
    },
  })
  const onSubmit: SubmitHandler<IFormInput> = data => {
    debugger
    dispatch(getNewToken(data.restoreEmail))
    resetField('restoreEmail')
  }

  return (
    <div>
      <div className={s.segment}>
        <Paper style={{ padding: '10px' }}>
          <div className={s.infoContainer}>
            <h2>Forgot your password?</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Email</label>
              <input
                {...register('restoreEmail', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid email address',
                  },
                })}
              />
              <p>{errors.restoreEmail?.message}</p>

              <div className={s.instructions}>
                Enter you email adress and we will send you further instructions
              </div>
              <input type={'submit'} />
            </form>
            <div className={s.instructions}>Did you remember you password?</div>
            <div>
              <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  )
}

//types
interface IFormInput {
  restoreEmail: string
}
