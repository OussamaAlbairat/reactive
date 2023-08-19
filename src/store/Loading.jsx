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
    const run = async () => {
      try {
        setStatus(RuningOperationStatus.started)
        const { status, message, data } = await getData(url)
        if (status === "OK") {
          setData(data || initData)
          setStatus(RuningOperationStatus.succeded)
        } else setStatus(RuningOperationStatus.failed)
      } catch (ex) {
        setStatus(RuningOperationStatus.failed)
        console.log(ex)
      }
    }
    run()
  }, [])

  return { data, setData, status }
}
