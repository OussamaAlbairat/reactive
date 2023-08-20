import { useState, useContext, useEffect } from "react"
import {
  RuningOperationStatus,
  RuningOperationStatusContext,
} from "../store/RuningOperationStatus"

const error = { theme: "danger", icon: "exclamation-triangle" }
const success = { theme: "success", icon: "hand-thumbs-up" }

const Alert = ({ type, message }) => {
  const [closed, setClosed] = useState(false)
  const { status } = useContext(RuningOperationStatusContext)

  const closeHandler = (e) => {
    e.preventDefault()
    setClosed(true)
  }

  useEffect(() => {
    if (status == RuningOperationStatus.notStarted) setClosed(true)
    else if (status == RuningOperationStatus.started) setClosed(true)
  }, [status])

  return (
    closed || (
      <div
        className={`container d-flex justify-content-start alert alert-${type.theme} alert-dismissible fade show`}
        role="alert"
      >
        <i className={`bi bi-${type.icon}`}></i>
        <span className="mx-2">{message}</span>
        <button
          type="button"
          className="btn-close"
          //data-bs-dismiss="alert"
          aria-label="Close"
          onClick={closeHandler}
        ></button>
      </div>
    )
  )
}

const RuningOperationSpinner = ({ status, message }) => {
  return (
    (status === RuningOperationStatus.started && (
      <div
        //className="d-flex justify-content-center m-5"
        style={{ zIndex: 1000, position: "absolute", top: "50%", left: "50%" }}
      >
        <div className="spinner-border" role="status"></div>
        <span className="sr-only m-2">{message || "Loading..."}</span>
      </div>
    )) ||
    (status === RuningOperationStatus.failed && (
      <Alert type={error} message="An error occured while fetching data." />
    )) ||
    (status === RuningOperationStatus.succeded && (
      <Alert type={success} message="Operation succeded." />
    ))
  )
}

export default RuningOperationSpinner
