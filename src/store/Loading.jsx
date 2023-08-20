import { useState, useEffect, useContext } from "react"
import {
  RuningOperationStatus,
  RuningOperationStatusContext,
} from "./RuningOperationStatus"
import useRegistry from "./Registry"

const cache = new Map()

export const useLoading = ({
  url,
  initData,
  cachedUrl = false,
  filterDataCondition = null,
}) => {
  const [data, setData] = useState(initData)
  const { subscribe, unsubscribe } = useRegistry()
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
    let result = { unsubscribe: null }

    const run = async () => {
      try {
        setStatus(RuningOperationStatus.started)
        const { status, message, data } = await getData(url)
        if (status === "OK") {
          setData(data || initData)
          setStatus(RuningOperationStatus.succeded)
          if (filterDataCondition) {
            const search = (value) => {
              if (value === "") setData(data)
              else {
                const filteredData = data.filter((obj) =>
                  filterDataCondition(obj, value)
                )
                setData(filteredData)
              }
            }
            subscribe("SEARCH", search)
            result.unsubscribe = () => unsubscribe("SEARCH", search)
          }
        } else setStatus(RuningOperationStatus.failed)
      } catch (ex) {
        setStatus(RuningOperationStatus.failed)
        console.log(ex)
      }
    }
    run()

    return () => result.unsubscribe && result.unsubscribe()
  }, [])

  return { data, setData, status }
}
