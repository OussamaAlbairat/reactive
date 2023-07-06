import { Loading } from "../store/Loading"

const LoadingSpinner = ({ loading }) => {
  return (
    (loading === Loading.failed && (
      <h1 className="d-flex justify-content-center">
        An error occured while fetching data.
      </h1>
    )) ||
    (loading === Loading.started && (
      <div className="d-flex justify-content-center m-5">
        <div className="spinner-border" role="status"></div>
        <span className="sr-only m-2">Loading...</span>
      </div>
    ))
  )
}

export default LoadingSpinner
