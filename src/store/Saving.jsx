import { useContext } from "react"
import { postApiData } from "./Utils"
import {
  RuningOperationStatus,
  RuningOperationStatusContext,
} from "./RuningOperationStatus"

export const useSaving = ({ url }) => {
  const { setStatus } = useContext(RuningOperationStatusContext)
  const save = async (save_data) => {
    setStatus(RuningOperationStatus.started)
    try {
      const { status, message, data } = await postApiData(url, save_data)
      console.log(message)
      if (status === "OK") setStatus(RuningOperationStatus.succeded)
      else setStatus(RuningOperationStatus.failed)
      return { status, message, data }
    } catch (ex) {
      setStatus(RuningOperationStatus.failed)
      console.log(ex)
      return { status: "NOK", message: "exception", data: [] }
    }
  }

  return { save }
}
