import React, { FC, useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Navigate, NavLink } from 'react-router-dom'

import { LoginType } from '../../s1-DAL/loginAPI'
import { useAppDispatch, useAppSelector } from '../../s1-DAL/store'
import { loginTC } from '../../s2-BLL/loginSlice'
import { PATH } from '../Routes/AppRoutes'

import s from './Login.module.css'

export const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginType>({ mode: 'onTouched' })

  const onSubmit: SubmitHandler<LoginType> = (data: LoginType) => {
    dispatch(loginTC(data))
    // reset()
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
            <FormControl sx={{ m: 1, width: '347px' }} variant="standard">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                error={!!errors.password}
                {...register('password', { required: 'Password is a required field!' })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && <span className={s.error}>{errors.password?.message}</span>}
            </FormControl>
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
