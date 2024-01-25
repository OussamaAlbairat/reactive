import { useEffect, useState, Children } from "react"
import { Link } from "react-router-dom"
import { useMsal } from "@azure/msal-react"
import { loginRequest } from "../authConfig"

const DropDownMenu = ({ children }) => {
  return (
    <ul className="navbar-nav">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-person"
            viewBox="0 0 32 32"
          >
            <path d="M 16 16 a 6 6 90 1 0 0 -12 a 6 6 90 0 0 0 12 Z m 4 -6 a 4 4 90 1 1 -8 0 a 4 4 90 0 1 8 0 Z m 8 16 c 0 2 -2 2 -2 2 H 6 s -2 0 -2 -2 s 2 -8 12 -8 s 12 6 12 8 Z m -2 -0.008 c -0.002 -0.492 -0.308 -1.972 -1.664 -3.328 C 23.032 21.36 20.578 20 16 20 c -4.58 0 -7.032 1.36 -8.336 2.664 c -1.356 1.356 -1.66 2.836 -1.664 3.328 h 20 Z" />
          </svg>
        </a>
        <ul className="dropdown-menu dropdown-menu-end">
          {Children.map(children, (child, ndx) => {
            return (
              <li key={ndx}>
                <div className="dropdown-item d-grid">{child}</div>
              </li>
            )
          })}
        </ul>
      </li>
    </ul>
  )
}

export const getUser = async () => {
  let resp = await fetch("/.auth/me")
  let data = await resp.json()
  let _user = data?.clientPrincipal?.userDetails
  if (_user) return { type: "provider", email: _user }

  resp = await fetch("/api/reactiveConfig/validatetoken")
  data = await resp.json()
  console.log(data)
  data = data?.data
  if (data && data.length > 0) return { type: "basic", email: data[0].email }

  return null
}

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const { accounts } = useMsal()

  useEffect(() => {
    if (accounts && accounts.length > 0)
      setUser({ type: "provider", email: accounts[0].username })
    else setUser(null)
  }, [accounts])

  return { user }
}

export const Auth = () => {
  const { user } = useAuth()
  const { instance } = useMsal()

  const clickLogin = (e) => {
    e.preventDefault()
    instance.loginPopup(loginRequest).catch((e) => console.log(e))
  }

  const clickLogout = (e) => {
    e.preventDefault()
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/",
    })
  }

  return (
    <div className="py-1">
      {user == null && (
        <DropDownMenu>
          <button
            onClick={clickLogin}
            className="btn btn-outline-success bi bi-person-up"
          >
            <span className="mx-2">Login</span>
          </button>
        </DropDownMenu>
      )}
      {user != null && (
        <DropDownMenu>
          <Link
            to="settings"
            className="btn btn-outline-secondary bi bi-person-gear"
          >
            <span className="mx-2">Settings</span>
          </Link>
          <button onClick={clickLogout} className="btn btn-danger">
            Logout ({user.email})
          </button>
        </DropDownMenu>
      )}
    </div>
  )
}
