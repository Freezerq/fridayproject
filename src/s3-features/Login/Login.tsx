import React, { FC, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Navigate, NavLink } from 'react-router-dom'

import { LoginType } from '../../s1-DAL/API'
import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { login } from '../../s2-BLL/authSlice'
import { PasswordInput } from '../../s4-components/common/PasswordInput/PasswordInput'
import { PATH } from '../Routes/AppRoutes'

import s from './Login.module.css'

export const Login: FC = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({ mode: 'onTouched' })

  const onSubmit: SubmitHandler<LoginType> = (data: LoginType) => {
    dispatch(login(data))
  }

  if (isLoggedIn) {
    return <Navigate to={'/profile'} />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        m: 1,
        width: '413px',
        height: '552px',
        margin: '50px auto',
      }}
    >
      <Paper elevation={3}>
        <div className={s.paperContainer}>
          <div className={s.title}>Sign in</div>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              sx={{ m: 1, width: '347px' }}
              id="email"
              label="Email"
              variant="standard"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email', { required: 'Email is a required field!' })}
            />
            <PasswordInput id="password" register={register} error={errors.password} />

            <div className={s.rememberMe}>
              <Checkbox id="rememberMe" {...register('rememberMe')} />
              <span>Remember me</span>
            </div>
            <NavLink to={PATH.PASSWORD_RESTORE} className={s.forgot}>
              Forgot Password?
            </NavLink>
            <Button
              sx={{
                width: '347px',
                borderRadius: '30px',
                mt: '69px',
                background: '#366EFF',
              }}
              type={'submit'}
              variant={'contained'}
              color={'primary'}
            >
              Sign In
            </Button>
          </form>
          <div className={s.already}>Already have an account?</div>
          <NavLink to={'/registration'} className={s.singUp}>
            Sing Up
          </NavLink>
        </div>
      </Paper>
    </Box>
  )
}
