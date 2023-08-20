import { useEffect } from "react"
import { RuningOperationStatus } from "./RuningOperationStatus"
import useRegistry from "./Registry"

export const useSearch = ({ data, setData, status, filterDataCondition }) => {
  const { subscribe, unsubscribe } = useRegistry()
  useEffect(() => {
    if (status === RuningOperationStatus.succeded && data.length > 0) {
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
      return () => unsubscribe("SEARCH", search)
    }
  }, [loadingDone])

  return { searchData: data }
}
