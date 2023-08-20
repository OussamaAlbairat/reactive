import { useState, useContext, useEffect } from "react"
import {
  RuningOperationStatus,
  RuningOperationStatusContext,
} from "../store/RuningOperationStatus"

const error = {
    theme: "danger",
    icon: "exclamation-triangle",
    message: "Operation failed.",
  },
  success = {
    theme: "success",
    icon: "hand-thumbs-up",
    message: "Operation succeded.",
  }

const Alert = ({ status, message }) => {
  const [closed, setClosed] = useState(false)
  const [type, setType] = useState(error)

  const closeHandler = (e) => {
    e.preventDefault()
    setClosed(true)
  }

  useEffect(() => {
    if (status == RuningOperationStatus.notStarted) setClosed(true)
    else if (status == RuningOperationStatus.started) setClosed(true)
    else if (status == RuningOperationStatus.failed) {
      setClosed(false)
      setType(error)
    } else if (status == RuningOperationStatus.succeded) {
      setClosed(false)
      setType(success)
    }
  }, [status])

  return (
    closed || (
      <div
        className={`container d-flex justify-content-start alert alert-${type.theme} alert-dismissible fade show`}
        role="alert"
      >
        <i className={`bi bi-${type.icon}`}></i>
        <span className="mx-2">{`${type.message} ${message}`}</span>
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

const RuningOperationSpinner = () => {
  const { status, message } = useContext(RuningOperationStatusContext)
  return (
    (status === RuningOperationStatus.started && (
      <div
        //className="d-flex justify-content-center m-5"
        style={{ zIndex: 1000, position: "absolute", top: "50%", left: "50%" }}
      >
        <div className="spinner-border" role="status"></div>
        <span className="sr-only m-2">{"Loading..."}</span>
      </div>
    )) || <Alert status={status} message={message} />
  )
}

export default RuningOperationSpinner
