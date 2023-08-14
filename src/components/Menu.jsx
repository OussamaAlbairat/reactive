import { Link } from "react-router-dom"
import Search from "./Search"
import { useAuth, Auth } from "./Auth"

const Menu = () => {
  const { user } = useAuth()

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      aria-label="Reactive"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="/finlambda.png"
            className="rounded"
            style={{ width: "36px", height: "36px" }}
            alt="Finlambda"
          />
        </a>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarscollaps"
          aria-controls="navbarscollaps"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarscollaps">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="stocks" className="nav-link">
                Instruments
              </Link>
            </li>
            {user != null && (
              <li className="nav-item">
                <Link to="portfolios" className="nav-link">
                  Portfolios
                </Link>
              </li>
            )}
            {user != null && (
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Back testing
                </a>
              </li>
            )}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Help
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="faq">
                    Faq
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="contact">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="weather">
                    Weather
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <Search />
          <Auth />
          {/* <form role="search">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form> */}
        </div>
      </div>
    </nav>
  )
}
export default Menu
