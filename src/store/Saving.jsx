import { useContext } from "react"
import { postApiData } from "./Utils"
import {
  RuningOperationStatus,
  RuningOperationStatusContext,
} from "./RuningOperationStatus"

export const useSaving = ({ url }) => {
  const { setStatus, setMessage } = useContext(RuningOperationStatusContext)

  const setOperationContext = (status, message) => {
    setStatus(status)
    setMessage(message)
  }

  const save = async (save_data) => {
    setOperationContext(RuningOperationStatus.started, "")
    try {
      const { status, message, data } = await postApiData(url, save_data)
      console.log(message)
      if (status === "OK")
        setOperationContext(RuningOperationStatus.succeded, message)
      else setOperationContext(RuningOperationStatus.failed, message)
      return { status, message, data }
    } catch (ex) {
      setOperationContext(RuningOperationStatus.failed, ex)
      console.log(ex)
      return { status: "NOK", message: "exception", data: [] }
    }
  }

  return { save }
}
