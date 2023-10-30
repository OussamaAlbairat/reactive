import { useContext } from "react"
import { useMsal } from "@azure/msal-react"
import { getAccessToken, postApiData } from "./Utils"
import {
  RuningOperationStatus,
  RuningOperationStatusContext,
} from "./RuningOperationStatus"

export const useSaving = ({ url, authorize = true }) => {
  const { instance } = useMsal()
  const { setStatus, setMessage, setShowAlert } = useContext(
    RuningOperationStatusContext
  )

  const setOperationContext = (status, message) => {
    setStatus(status)
    setMessage(message)
    setShowAlert(true)
  }

  const save = async (save_data) => {
    setOperationContext(RuningOperationStatus.started, "")
    try {
      const accessToken = await getAccessToken(authorize, instance)
      const { status, message, data } = await postApiData(
        url,
        accessToken,
        save_data
      )
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
