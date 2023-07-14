import { useState } from "react"
import { useParams } from "react-router-dom"
import { useLoading } from "../store/Loading"
import { useSaving } from "../store/Saving"
import { RuningOperationStatus } from "../store/RuningOperationStatus"
import RuningOperationSpinner from "../components/RuningOperationSpinner"

const Portfolio = () => {
  let { id } = useParams()

  const [runingOperationStatus, setRuningOperationStatus] = useState(
    RuningOperationStatus.notStarted
  )

  const formatDate = (date) => {
    let dt = new Date(date)
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
    <div className="container-fluid">
      <RuningOperationSpinner status={runingOperationStatus} />
      {runingOperationStatus === RuningOperationStatus.succeded && (
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
            <small id="createdHelp" className="form-text text-muted">
              Date the portfolio is created.
            </small>
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
            <small id="descriptionHelp" className="form-text text-muted">
              Describe briefly your portfolio.
            </small>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-danger"
              onClick={saveClicked}
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Portfolio
