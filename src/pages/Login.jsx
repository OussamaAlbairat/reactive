const Login = () => {
  return (
    <div
      className="container d-flex justify-content-center"
      style={{ height: "600px" }}
    >
      <div className="card my-auto">
        <div className="card-header">Login with provider:</div>
        <ul className="list-group list-group-flush">
          {[
            { provider: "aad", icon: "microsoft", label: "Microsoft Azure" },
            { provider: "google", icon: "google", label: "Google" },
            { provider: "github", icon: "github", label: "Github" },
            { provider: "twitter", icon: "twitter", label: "Twitter" },
          ].map((item, ndx) => {
            return (
              <li key={ndx} className="list-group-item">
                <a
                  style={{ width: "256px" }}
                  href={`.auth/login/${item.provider}`}
                  className={`btn btn-outline-secondary btn-lg btn-block my-2 bi bi-${item.icon}`}
                >
                  <span className="mx-2">{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Login
