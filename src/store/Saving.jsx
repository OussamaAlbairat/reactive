import { postApiData } from "./Utils"
import { RuningOperationStatus } from "./RuningOperationStatus"

export const useSaving = ({ url, setRuningOperationStatus, cors = false }) => {
  const save = async (save_data) => {
    setRuningOperationStatus(RuningOperationStatus.started)
    try {
      const resp = await postApiData(url, save_data)
      const { status, message, data } = await resp.json()
      console.log(message)
      if (status === "OK")
        setRuningOperationStatus(RuningOperationStatus.succeded)
      else setRuningOperationStatus(RuningOperationStatus.failed)
      return { status, message, data }
    } catch (ex) {
      setRuningOperationStatus(RuningOperationStatus.failed)
      console.log(ex)
      return { status: "NOK", message: "exception", data: [] }
    }
  }

  return { save }
}
