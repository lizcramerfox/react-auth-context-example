import React, { useContext } from "react"
import { AuthContext } from "./context"

export default function ProtectedPage() {
  const authContext = useContext(AuthContext)
  // console.log(authContext.token)
  
  return (
    <>
      {authContext.isLoggedIn && <h1>I am a PROTECTED resource.</h1>}
    </>
  )
}