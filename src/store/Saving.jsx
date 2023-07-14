import axios from "axios"
import { RuningOperationStatus } from "./RuningOperationStatus"

export const useSaving = ({ url, setRuningOperationStatus }) => {
  const save = async (save_data) => {
    setRuningOperationStatus(RuningOperationStatus.started)
    try {
      const resp = await axios.post(url, save_data)
      const { status, message, data } = resp.data
      console.log(message)
      if (status === "OK")
        setRuningOperationStatus(RuningOperationStatus.succeded)
      else setRuningOperationStatus(RuningOperationStatus.failed)
      return data
    } catch (ex) {
      setRuningOperationStatus(RuningOperationStatus.failed)
      console.log(ex)
      return []
    }
  }

  return { save }
}
