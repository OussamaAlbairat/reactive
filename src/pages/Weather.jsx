import { Loading, useLoading } from "../store/Loading"
import LoadingSpinner from "../components/LoadingSpinner"
import { useSearch } from "../store/Searching"

function Weather() {
  const { data, setData, loading } = useLoading({
    url: "https://localhost:7264/WeatherForecast",
    initData: [],
  })

  const { searchData } = useSearch({
    data,
    setData,
    loading,
    filterData: (obj, value) => obj.summary.startsWith(value),
  })

  return (
    <>
      <h1>Weather</h1>
      <LoadingSpinner loading={loading} />
      {loading === Loading.succeded &&
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
