import { useState } from "react"
import { postApiData } from "../store/Utils"
import { useLoading } from "../store/Loading"
import { useSaving } from "../store/Saving"
import { RuningOperationStatus } from "../store/RuningOperationStatus"
import RuningOperationSpinner from "../components/RuningOperationSpinner"

const Settings = () => {
  const [runingOperationStatus, setRuningOperationStatus] = useState(
    RuningOperationStatus.notStarted
  )

  const { data, setData } = useLoading({
    url: "/api/reactiveConfig/settings",
    initData: [
      {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordconfirm: "",
      },
    ],
    setRuningOperationStatus,
    cachedUrl: false,
    cors: true,
  })

  const { save } = useSaving({
    url: "/api/reactiveConfig/settings",
    setRuningOperationStatus,
  })

  const onChangeHandler = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setData((old) => {
      return [{ ...old[0], [name]: value }]
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const run = async () => {
      const result = await save({
        ...data[0],
      })
      if (result.status == "OK") navigate("/")
      else alert(result.message)
    }
    run()
  }

  return (
    <>
      <RuningOperationSpinner status={runingOperationStatus} />
      <div className="container row col-4 offset-4">
        <form className="form">
          <div className="card">
            <div className="card-header text-center">Settings</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  id="firstname"
                  name="firstname"
                  className="form-control"
                  type="text"
                  value={data[0].firstname}
                  onChange={onChangeHandler}
                />
              </li>
              <li className="list-group-item form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  id="lastname"
                  name="lastname"
                  className="form-control"
                  type="text"
                  value={data[0].lastname}
                  onChange={onChangeHandler}
                />
              </li>
              <li className="list-group-item form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  className="form-control"
                  type="email"
                  value={data[0].email}
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
                  value={data[0].password}
                  onChange={onChangeHandler}
                />
              </li>
              <li className="list-group-item form-group">
                <label htmlFor="passwordconfirm">Password Confirm</label>
                <input
                  id="passwordconfirm"
                  name="passwordconfirm"
                  className="form-control"
                  type="password"
                  value={data[0].passwordconfirm}
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
    </>
  )
}
export default Settings
