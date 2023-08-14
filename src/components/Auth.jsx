import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const useAuth = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const run = async () => {
      let resp = await fetch("/.auth/me")
      let data = await resp.json()
      let _user = data?.clientPrincipal?.userDetails
      if (_user) {
        setUser({ type: "provider", email: _user })
        return
      }
      resp = await fetch("/api/reactiveConfig/validatetoken")
      data = await resp.json()
      console.log(data)
      data = data?.data
      if (data && data.length > 0)
        setUser({ type: "basic", email: data[0].email })
    }
    run()
  }, [])

  return { user, setUser }
}

export const Auth = () => {
  const { user, setUser } = useAuth()

  const clickHandler = (e) => {
    e.preventDefault()
    const run = async () => {
      let resp = await fetch("/api/reactiveConfig/logout")
      let data = await resp.json()
      console.log(data)
      if (data && data.status == "OK") setUser(null)
      const navigate = useNavigate()
      navigate("/")
    }
    run()
  }

  return (
    <div className="py-1">
      {user == null && (
        <Link to="login" className="btn btn-success mx-2">
          Login
        </Link>
      )}
      {user != null && user.type == "basic" && (
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
                class="bi bi-person"
                viewBox="0 0 32 32"
              >
                <path d="M 16 16 a 6 6 90 1 0 0 -12 a 6 6 90 0 0 0 12 Z m 4 -6 a 4 4 90 1 1 -8 0 a 4 4 90 0 1 8 0 Z m 8 16 c 0 2 -2 2 -2 2 H 6 s -2 0 -2 -2 s 2 -8 12 -8 s 12 6 12 8 Z m -2 -0.008 c -0.002 -0.492 -0.308 -1.972 -1.664 -3.328 C 23.032 21.36 20.578 20 16 20 c -4.58 0 -7.032 1.36 -8.336 2.664 c -1.356 1.356 -1.66 2.836 -1.664 3.328 h 20 Z" />
              </svg>
            </a>
            <ul className="dropdown-menu dropdown-menu-right">
              <li>
                <button
                  type="button"
                  onClick={clickHandler}
                  className="dropdown-item btn btn-danger mx-2"
                >
                  Logout({user.email})
                </button>
              </li>
            </ul>
          </li>
        </ul>
      )}
      {user != null && user.type == "provider" && (
        <div className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle bi bi-person"
            href="#"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></a>
          <ul className="dropdown-menu">
            <li>
              <a
                href="/.auth/logout"
                className="dropdown-item btn btn-danger mx-2"
              >
                Logout({user.email})
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
