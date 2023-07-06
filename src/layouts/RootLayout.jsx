import { Outlet } from "react-router-dom"
import Menu from "../components/Menu"

const RootLayout = () => {
  return (
    <div>
      <header
        className="fixed-top"
        style={{ borderBottom: "solid", borderColor: "red" }}
      >
        <Menu />
      </header>
      <main style={{ marginTop: "4rem" }}>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
