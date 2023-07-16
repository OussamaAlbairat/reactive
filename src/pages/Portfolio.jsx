import { useState } from "react"
import { useParams } from "react-router-dom"
import { useLoading } from "../store/Loading"
import { useSaving } from "../store/Saving"
import { RuningOperationStatus } from "../store/RuningOperationStatus"
import RuningOperationSpinner from "../components/RuningOperationSpinner"

const Portfolio = () => {
  const { id } = useParams()

  const [runingOperationStatus, setRuningOperationStatus] = useState(
    RuningOperationStatus.notStarted
  )

  const formatDate = (date) => {
    const dt = new Date(date)
    return `${dt.getFullYear()}-${(dt.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${(dt.getDate() + 1).toString().padStart(2, "0")}`
  }

  const isInteger = (a) => {
    return !Number.isNaN(Number.parseInt(a))
  }

  const { data, setData } = useLoading({
    url: isInteger(id)
      ? `https://portfoliosmanagement.azurewebsites.net/api/portfolio?id=${id}`
      : null,
    initData: [
      { id: id || -1, created: "", description: "", report: '{ "stocks":[]}' },
    ],
    setRuningOperationStatus,
  })

  const { save } = useSaving({
    url: "https://portfoliosmanagement.azurewebsites.net/api/portfolio",
    setRuningOperationStatus,
  })

  const inputChanged = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData((old) => {
      return [{ ...old[0], [name]: value }]
    })
  }

  const saveClicked = (e) => {
    e.preventDefault()
    console.log(data)
    save(data[0]).then((dt) => {
      console.log(dt)
      setData(dt)
    })
  }

  return (
    <div className="container">
      <RuningOperationSpinner status={runingOperationStatus} />
      <form>
        <div className="form-group">
          <label htmlFor="created">Created</label>
          <input
            id="created"
            name="created"
            type="date"
            className="form-control"
            aria-describedby="createdHelp"
            onChange={inputChanged}
            value={formatDate(data[0].created)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            aria-describedby="descriptionHelp"
            onChange={inputChanged}
            value={data[0].description}
          />
        </div>
        <hr />
        <table className="table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Ratio</th>
            </tr>
          </thead>
          <tbody>
            {JSON.parse(data[0].report).stocks.map((stock, index) => {
              return (
                <tr key={index}>
                  <td>{stock.symbol}</td>
                  <td>{stock.ratio * 100 + "%"}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="d-flex justify-content-end my-5">
          <button
            type="submit"
            className="btn btn-danger"
            onClick={saveClicked}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default Portfolio
