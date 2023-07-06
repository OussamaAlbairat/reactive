import { useEffect } from "react"
import { useState } from "react"

function List() {
  let [list, setList] = useState([])

  useEffect(() => {
    fetch("https://localhost:7264/WeatherForecast")
      .then((response) => {
        setList(response.data)
      })
      .catch((error) => {})
  }, [])

  return (
    <>
      <h1>Weather</h1>
      {list.map((item) => (
        <div key={item.date}>
          <p>
            <span>{item.date}</span>
            <span>{`${item.temperatureC} (${item.summary})`}</span>
          </p>
        </div>
      ))}
    </>
  )
}

export default List
