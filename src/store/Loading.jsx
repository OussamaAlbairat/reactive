import { useState, useEffect } from "react"
import { RuningOperationStatus } from "./RuningOperationStatus"

const cache = new Map()

export const useLoading = ({
  url,
  initData,
  setRuningOperationStatus,
  cachedUrl = false,
}) => {
  const [data, setData] = useState(initData)

  const getData = async (uri) => {
    if (cachedUrl && cache.has(uri)) return cache.get(uri)
    else if (cachedUrl) return cache.set(uri, await doFetch(uri)).get(uri)
    else return await doFetch(uri)
  }

  const doFetch = async (uri) => {
    const resp = uri ? await fetch(uri) : null
    const dt = resp ? await resp.json() : null
    return dt || { status: "OK", message: "url not provided", data: initData }
  }

  useEffect(() => {
    setRuningOperationStatus(RuningOperationStatus.started)
    getData(url)
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
