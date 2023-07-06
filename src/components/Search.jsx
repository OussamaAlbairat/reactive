import { useEffect } from "react"
import { useState } from "react"
import useRegistry from "../store/Registry"

const Search = () => {
  const [value, setValue] = useState("")
  const { publish, dispatch } = useRegistry()

  useEffect(() => {
    publish("SEARCH")
  }, [])

  useEffect(() => {
    dispatch("SEARCH", value)
  }, [value])

  return (
    <form role="search">
      <input
        className="form-control"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </form>
  )
}

export default Search
