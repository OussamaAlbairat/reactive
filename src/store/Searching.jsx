import { useEffect } from "react"
import { Loading } from "./Loading"
import useRegistry from "./Registry"

export const useSearch = ({ data, setData, loading, filterData }) => {
  const { subscribe, unsubscribe } = useRegistry()
  useEffect(() => {
    if (loading === Loading.succeded) {
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
  }, [loading])

  return { searchData: data }
}
