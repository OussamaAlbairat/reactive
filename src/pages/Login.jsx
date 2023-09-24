import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSaving } from "../store/Saving"
import useRegistry from "../store/Registry"

const Login = () => {
  const { save } = useSaving({ url: "/api/reactiveConfig/Login" })
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { navigate } = useNavigate()
  const { dispatch } = useRegistry()

  const onChangeHandler = (e) => {
    e.preventDefault()
    if (e.target.name == "email") setEmail(e.target.value)
    if (e.target.name == "password") setPassword(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const run = async () => {
      const result = await save({
        email,
        password,
        tz: new Date().getTimezoneOffset(),
      })
      if (result.status == "OK") {
        navigate("/")
        dispatch("MENU_REFRESH", {})
      } else alert("Unable to authenticate user.")
    }
    run()
  }

  const providers = [
    { provider: "aad", icon: "microsoft", label: "Microsoft Azure" },
    { provider: "google", icon: "google", label: "Google" },
    { provider: "github", icon: "github", label: "Github" },
    { provider: "twitter", icon: "twitter", label: "Twitter" },
  ]

  return (
    <div className="container-fluid row my-auto" style={{ height: "400px" }}>
      <div className="col-4 my-auto mx-auto">
        <form className="form">
          <div className="card">
            <div className="card-header text-center">Login</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  className="form-control"
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={onChangeHandler}
                />
              </li>
              <li className="list-group-item form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={onChangeHandler}
                />
              </li>
            </ul>
            <button className="btn btn-success m-2" onClick={submitHandler}>
              Submit
            </button>
          </div>
        </form>
        <hr />
        <Providers providers={providers} />
      </div>
    </div>
  )
}

const Providers = ({ providers }) => {
  return (
    <div className="row">
      <div className="col d-flex justify-content-center">
        {providers.map((item, ndx) => {
          return (
            <div key={ndx} className="d-inline mx-1">
              <a
                href={`.auth/login/${item.provider}`}
                className={`btn btn-outline-secondary btn-sm my-1 bi bi-${item.icon}`}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-title={`${item.label}`}
              ></a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Login
