import React, { useContext } from 'react'
import { AuthContext } from './context'
import './index.css'

export default function Authentication() {
  const authContext = useContext(AuthContext)
  
  const loginHandler = () => {
    const userResponse = {
      token: 'abjd2323jb443jbbb'
    }
    authContext.login(userResponse.token)
  }

  const logoutHandler = () => {
    authContext.logout()
  }

  return (
    <>
      {!authContext.isLoggedIn && (
        <button className='login' onClick={loginHandler}>
          Login
        </button>
      )}
      {authContext.isLoggedIn && (
        <button className='logout' onClick={logoutHandler}>
          Logout
        </button>
      )}
    </>
  )
}