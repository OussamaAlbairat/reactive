import { createContext } from "react"

export const RuningOperationStatus = {
  succeded: Symbol(0),
  failed: Symbol(1),
  started: Symbol(2),
  notStarted: Symbol(3),
}

export const RuningOperationStatusContext = createContext({
  status: null,
  setStatus: null,
})
