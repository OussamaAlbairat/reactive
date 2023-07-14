import { useEffect } from "react"
import { RuningOperationStatus } from "./RuningOperationStatus"
import useRegistry from "./Registry"

export const useSearch = ({
  data,
  setData,
  runingOperationStatus,
  filterData,
}) => {
  const { subscribe, unsubscribe } = useRegistry()
  useEffect(() => {
    if (runingOperationStatus === RuningOperationStatus.succeded) {
      const search = (value) => {
        if (value === "") setData(data)
        else {
          const filteredData = data.filter((obj) => filterData(obj, value))
          setData(filteredData)
        }
      }
      subscribe("SEARCH", search)
      return () => unsubscribe("SEARCH", search)
    }
  }, [runingOperationStatus])

  return { searchData: data }
}
