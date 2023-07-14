import { useState } from "react"
import { useLoading } from "../store/Loading"
import { useSearch } from "../store/Searching"
import { RuningOperationStatus } from "../store/RuningOperationStatus"
import RuningOperationSpinner from "../components/RuningOperationSpinner"

function Weather() {
  const [runingOperationStatus, setRuningOperationStatus] = useState(
    RuningOperationStatus.notStarted
  )

  const { data, setData } = useLoading({
    url: "https://localhost:7264/WeatherForecast",
    initData: [],
    setRuningOperationStatus,
  })

  const { searchData } = useSearch({
    data,
    setData,
    runingOperationStatus,
    filterData: (obj, value) => obj.summary.startsWith(value),
  })

  return (
    <>
      <h1>Weather</h1>
      <RuningOperationSpinner status={runingOperationStatus} />
      {runingOperationStatus === RuningOperationStatus.succeded &&
        searchData.map((item) => (
          <div key={item.date}>
            <p>
              <span style={{ color: "blue" }}>{`${
                item.date.split("T")[0]
              } `}</span>
              <span
                style={{ color: "red" }}
              >{`${item.temperatureC} (${item.summary})`}</span>
            </p>
          </div>
        ))}
    </>
  )
}

export default Weather
