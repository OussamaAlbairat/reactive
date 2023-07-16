import { RuningOperationStatus } from "../store/RuningOperationStatus"

const RuningOperationSpinner = ({ status, message }) => {
  return (
    (status === RuningOperationStatus.failed && (
      <h1 className="d-flex justify-content-center">
        An error occured while fetching data.
      </h1>
    )) ||
    (status === RuningOperationStatus.started && (
      <div
        //className="d-flex justify-content-center m-5"
        style={{ zIndex: 1000, position: "absolute", top: "50%", left: "50%" }}
      >
        <div className="spinner-border" role="status"></div>
        <span className="sr-only m-2">{message || "Loading..."}</span>
      </div>
    ))
  )
}

export default RuningOperationSpinner
