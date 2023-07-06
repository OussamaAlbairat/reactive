import { useRouteError } from "react-router-dom"

const Error = () => {
  const error = useRouteError()
  return <p className="error">{error.statusText || error.message}</p>
}

export default Error
