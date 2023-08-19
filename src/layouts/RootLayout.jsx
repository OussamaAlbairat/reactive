import { useState } from "react"
import { Outlet } from "react-router-dom"
import Menu from "../components/Menu"
import {
  RuningOperationStatus,
  RuningOperationStatusContext,
} from "../store/RuningOperationStatus"
import RuningOperationSpinner from "../components/RuningOperationSpinner"

const RootLayout = () => {
  const [runingOperationStatus, setRuningOperationStatus] = useState(
    RuningOperationStatus.notStarted
  )
  return (
    <RuningOperationStatusContext.Provider
      value={{
        status: runingOperationStatus,
        setStatus: setRuningOperationStatus,
      }}
    >
      <div>
        <header
          className="fixed-top"
          style={{ borderBottom: "solid", borderColor: "red" }}
        >
          <Menu />
        </header>
        <main style={{ marginTop: "5rem" }}>
          <RuningOperationSpinner status={runingOperationStatus} />
          <Outlet />
        </main>
      </div>
    </RuningOperationStatusContext.Provider>
  )
}

export default RootLayout
