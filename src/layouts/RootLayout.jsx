import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Menu from "../components/Menu"
import {
  RuningOperationStatus,
  RuningOperationStatusContext,
} from "../store/RuningOperationStatus"
import RuningOperationSpinner from "../components/RuningOperationSpinner"

const RootLayout = () => {
  const [runingOperationStatusMessage, setRuningOperationStatusMessage] =
    useState(null)
  const [runingOperationStatus, setRuningOperationStatus] = useState(
    RuningOperationStatus.notStarted
  )

  return (
    <RuningOperationStatusContext.Provider
      value={{
        status: runingOperationStatus,
        setStatus: setRuningOperationStatus,
        message: runingOperationStatusMessage,
        setMessage: setRuningOperationStatusMessage,
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
          <RuningOperationSpinner />
          <Outlet />
        </main>
      </div>
    </RuningOperationStatusContext.Provider>
  )
}

export default RootLayout
