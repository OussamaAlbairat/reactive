import { useEffect, useState } from "react"
import { postApiData } from "../store/Utils"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    e.preventDefault()
    if (e.target.name == "email") setEmail(e.target.value)
    if (e.target.name == "password") setPassword(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const run = async () => {
      const result = await postApiData("/api/reactiveConfig/Login", {
        email,
        password,
      })
      if (result.status == "OK") navigate("/")
      else alert("Unable to authenticate user.")
    }
    run()
  }

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
      </div>
      <div className="col-1 my-auto mx-auto text-center">
        <u>Or</u>
      </div>
      <div className="col-5 my-auto mx-auto">
        <div className="card">
          <div className="card-header text-center">
            Use an identity provider
          </div>
          <ul className="list-group list-group-flush">
            {[
              { provider: "aad", icon: "microsoft", label: "Microsoft Azure" },
              { provider: "google", icon: "google", label: "Google" },
              { provider: "github", icon: "github", label: "Github" },
              { provider: "twitter", icon: "twitter", label: "Twitter" },
            ].map((item, ndx) => {
              return (
                <li key={ndx} className="list-group-item">
                  <div className="row">
                    <a
                      href={`.auth/login/${item.provider}`}
                      className={`col-6 offset-3 btn btn-outline-secondary btn-lg btn-block my-2 bi bi-${item.icon}`}
                    >
                      <span className="d-none d-lg-inline mx-2">
                        {item.label}
                      </span>
                    </a>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login
