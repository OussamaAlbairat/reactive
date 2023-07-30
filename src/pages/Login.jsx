const Login = () => {
  return (
    <div
      className="container d-flex justify-content-center"
      style={{ height: "600px" }}
    >
      <div className="card my-auto">
        <div className="card-header">Login with provider:</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <a
              style={{ width: "256px" }}
              href=".auth/login/aad"
              className="btn btn-outline-secondary btn-lg btn-block my-2 bi bi-microsoft"
            >
              <span className="mx-2">Microsoft Azure</span>
            </a>
          </li>
          <li className="list-group-item">
            <a
              style={{ width: "256px" }}
              href=".auth/login/google"
              className="btn btn-outline-secondary btn-lg btn-block my-2 bi bi-google"
            >
              <span className="mx-2">Google</span>
            </a>
          </li>{" "}
          <li className="list-group-item">
            <a
              style={{ width: "256px" }}
              href=".auth/login/github"
              className="btn btn-outline-secondary btn-lg btn-block my-2 bi bi-github"
            >
              <span className="mx-2">Github</span>
            </a>
          </li>
          <li className="list-group-item">
            <a
              style={{ width: "256px" }}
              href=".auth/login/twitter"
              className="btn btn-outline-secondary btn-lg btn-block my-2 bi bi-twitter"
            >
              <span className="mx-2">Twitter</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Login
