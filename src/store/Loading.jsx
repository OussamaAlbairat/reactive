import { useState, useEffect } from "react"
import { RuningOperationStatus } from "./RuningOperationStatus"

export const useLoading = ({ url, initData, setRuningOperationStatus }) => {
  const [data, setData] = useState(initData)

  const doFetch = async () => {
    const resp = url ? await fetch(url) : null
    const dt = resp ? await resp.json() : null
    return dt || { status: "OK", message: "url not provided", data: initData }
  }

  useEffect(() => {
    setRuningOperationStatus(RuningOperationStatus.started)
    doFetch()
      .then((dt) => {
        const { status, message, data } = dt
        setData(data)
        if (status === "OK")
          setRuningOperationStatus(RuningOperationStatus.succeded)
        else setRuningOperationStatus(RuningOperationStatus.failed)
      })
      .catch((e) => setRuningOperationStatus(RuningOperationStatus.failed))
  }, [])

  return { data, setData }
}
