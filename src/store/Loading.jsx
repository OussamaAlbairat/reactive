import { useState, useEffect, useContext } from "react"
import {
  RuningOperationStatus,
  RuningOperationStatusContext,
} from "./RuningOperationStatus"

const cache = new Map()

export const useLoading = ({ url, initData, cachedUrl = false }) => {
  const [data, setData] = useState(initData)
  const { status, setStatus } = useContext(RuningOperationStatusContext)
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
    setStatus(RuningOperationStatus.started)
    getData(url)
      .then((dt) => {
        const { status, message, data } = dt
        setData(data || initData)
        if (status === "OK") setStatus(RuningOperationStatus.succeded)
        else setStatus(RuningOperationStatus.failed)
      })
      .catch((e) => setStatus(RuningOperationStatus.failed))
  }, [])

  return { data, setData, status }
}
