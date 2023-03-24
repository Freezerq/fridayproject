import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../../s1-DAL/store'
import { LogOutButton } from '../../s3-features/Login/LogOutButton/LogOutButton'
import { PATH } from '../Routes/AppRoutes'

import s from './Header.module.scss'

const Header = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  return (
    <div className={s.nav}>
      <AppBar position="static" color={'inherit'}>
        <Toolbar>
          <Typography variant="h6">
            <NavLink to={PATH.LOGIN}>Login</NavLink>
            <NavLink to={PATH.REGISTRATION}>REGISTRATION</NavLink>
            <NavLink to={PATH.PROFILE}>PROFILE</NavLink>
            <NavLink to={PATH.ERROR404}>ERROR404</NavLink>
            <NavLink to={PATH.PASSWORD_RESTORE}>PASSWORD_RESTORE</NavLink>
            <NavLink to={PATH.NEW_PASSWORD}>NEW_PASSWORD</NavLink>
            <NavLink to={PATH.TEST_SUPER_COMPONENTS}>TEST_SUPER_COMPONENTS</NavLink>
            <NavLink to={PATH.CARDS}>Cards</NavLink>
            <NavLink to={PATH.PACKS}>Packs</NavLink>
          </Typography>
          {isLoggedIn && <LogOutButton />}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
