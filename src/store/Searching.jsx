import { useEffect } from "react"
import { RuningOperationStatus } from "./RuningOperationStatus"
import useRegistry from "./Registry"

export const useSearch = ({
  data,
  setData,
  runingOperationStatus,
  filterDataCondition,
}) => {
  const { subscribe, unsubscribe } = useRegistry()
  useEffect(() => {
    if (runingOperationStatus === RuningOperationStatus.succeded) {
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
  }, [runingOperationStatus])

  return { searchData: data }
}
