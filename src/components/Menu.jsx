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
          Reactive
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
                  <a className="dropdown-item" href="faq">
                    Faq
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="contact">
                    Contact
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="about">
                    About
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="weather">
                    Weather
                  </a>
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
