import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const useAuth = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    ;(async () => {
      const resp = await fetch(".auth/me")
      const credentials = await resp.json()
      const user = credentials.clientPrincipal.userDetails
      setUser(user)
      return true
    })()
  }, [])

  return { user }
}

export const Auth = () => {
  const { user } = useAuth()

  return (
    <div>
      {user == null && (
        <Link to="login" className="btn btn-success mx-2">
          Login
        </Link>
      )}
      {user != null && (
        <a href="/.auth/logout" className="btn btn-primary mx-2">
          Logout({user})
        </a>
      )}
    </div>
  )
}
