import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Paper from '@mui/material/Paper'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Navigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { createNewPasswordTC } from '../Login/loginReducer'
import { PATH } from '../Routes/AppRoutes'

import s from './CreateNewPassword.module.css'

type NewPasswordType = {
  password: string
}

export const CreateNewPassword = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const dispatch = useAppDispatch()
  const isCreateNewPassword = useAppSelector(state => state.login.isCreateNewPassword)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordType>({ mode: 'onTouched' })

  const { token } = useParams<{ token: string }>()

  const onSubmit: SubmitHandler<NewPasswordType> = data => {
    if (token) {
      dispatch(createNewPasswordTC({ password: data.password, resetPasswordToken: token }))
    }
  }

  if (isCreateNewPassword) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        m: 1,
        width: '413px',
        height: '372px',
        margin: '50px auto',
      }}
    >
      <Paper elevation={3}>
        <div className={s.paperContainer}>
          <div className={s.title}>Create new password</div>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ m: 1, width: '347px' }} variant="standard">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                error={!!errors.password}
                {...register('password', {
                  required: 'Password is a required field!',
                  minLength: { value: 6, message: 'Minimum length of password is 6 symbols' },
                  maxLength: { value: 30, message: 'Maximum length of password is 30 symbols' },
                })}
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
            <p className={s.text}>
              {`Create new password and we will send you further instructions to email`}
            </p>
            <Button
              sx={{
                width: '347px',
                borderRadius: '30px',
                mt: '42px',
                background: '#366EFF',
                letterSpacing: '0.01em',
              }}
              type={'submit'}
              variant={'contained'}
              color={'primary'}
            >
              Create new password
            </Button>
          </form>
        </div>
      </Paper>
    </Box>
  )
}
