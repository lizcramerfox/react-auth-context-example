import './App.css'
import React, { useState, useEffect } from 'react'
import Authentication from './auth'
import ProtectedPage from './protectedPage'
import { AuthContext } from './context'

let logoutTimer

function App() {
  const [token, setToken] = useState(null)
  const [tokenExpirationTime, setTokenExpirationTime] = useState()
  

  const login = (token, tokenExpirationTime) => {
    setToken(token)

    // Check if there is already an expiration time; if not, create a new one
    const expiration = tokenExpirationTime || new Date(new Date().getTime() + 1000 * 60 * 60)
    setTokenExpirationTime(expiration)

    // Save token & expiration time in local storage:
    localStorage.setItem(
      'userData',
      JSON.stringify({
        token,
        tokenExpirationTime: expiration.toISOString()
      })
    )
  }

  const logout = () => {
    setToken(null)
    setTokenExpirationTime(null)
    localStorage.removeItem('userData')
  }

  // Hook to check if localStorage has data; auto-login if there is and token not expired
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))

    if (storedData && storedData.token && new Date(storedData.tokenExpirationTime) > new Date()) {
      login(storedData.token, new Date(storedData.tokenExpirationTime))
    }
  }, [])

  // Hook to set timer if expiration time is in future, otherwise clear the timer
  useEffect(() => {
    if (token && tokenExpirationTime) {
      const remainingTime = tokenExpirationTime.getTime() - new Date().getTime()
      
      logoutTimer = setTimeout(logout, remainingTime)

    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, tokenExpirationTime])

  console.log(logoutTimer)

  return (
    <AuthContext.Provider 
      value={{
        // !! before token forces token into a boolean value so it works for isLoggedIn
        isLoggedIn: !!token, 
        token: token,
        login: login, 
        logout: logout
      }}
    >
      <div className="center">
        <Authentication />
        <ProtectedPage />
      </div>
    </AuthContext.Provider>
  )
}

export default App;
