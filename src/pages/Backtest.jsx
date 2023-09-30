import { formatDate, isInteger, strToBool } from "../store/Utils"
import { useParams } from "react-router-dom"
import { useLoading } from "../store/Loading"
import { useSaving } from "../store/Saving"
import PortfoliosList from "../components/PortfoliosList"
import Graph from "../components/Graph"

function Backtest() {
  const { id } = useParams()

  const { data, setData } = useLoading({
    url: isInteger(id) ? `/api/portfoliosmanagement/backtest?id=${id}` : null,
    initData: [
      {
        id: id || -1,
        created: "",
        description: "",
        start_date: "",
        end_date: "",
        log_returns: false,
        report: "",
      },
    ],
    cachedUrl: false,
  })

  const { save } = useSaving({ url: "/api/portfoliosmanagement/backtest" })

  const inputChanged = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setData((old) => {
      return [{ ...old[0], [name]: value }]
    })
  }

  const logReturnsChanged = (e) => {
    const name = e.target.name
    const value = e.target.checked
    setData((old) => {
      return [{ ...old[0], [name]: value }]
    })
  }

  const setPortfolioId = (value) => {
    setData((old) => {
      return [{ ...old[0], portfolio_id: value }]
    })
  }

  const saveClicked = (e) => {
    e.preventDefault()
    save(data[0]).then((dt) => {
      if (dt.status == "OK" && dt.data && dt.data.length) setData(dt.data)
    })
  }

  const attrs = {
    id: "log_returns",
    name: "log_returns",
    type: "checkbox",
    className: "form-check-input",
    onChange: logReturnsChanged,
  }

  if (strToBool(data[0].log_returns)) attrs.checked = true

  return (
    <form className="container-fluid">
      <div className="row">
        <h4>Portfolio backtest</h4>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="form-group my-1">
            <label htmlFor="created">Created</label>
            <input
              id="created"
              name="created"
              type="date"
              className="form-control"
              onChange={inputChanged}
              value={formatDate(data[0].created)}
            />
          </div>
          <div className="form-group my-1">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              onChange={inputChanged}
              value={data[0].description}
            />
          </div>
          <div className="form-group my-1">
            <label htmlFor="portfolio_id">Portfolio</label>
            <PortfoliosList
              selectId="portfolio_id"
              portfolioId={data[0].portfolio_id}
              setPortfolioId={setPortfolioId}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group my-1">
            <label htmlFor="start_date">Start Date</label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              className="form-control"
              onChange={inputChanged}
              value={formatDate(data[0].start_date)}
            />
          </div>
          <div className="form-group my-1">
            <label htmlFor="end_date">End Date</label>
            <input
              id="end_date"
              name="end_date"
              type="date"
              className="form-control"
              onChange={inputChanged}
              value={formatDate(data[0].end_date)}
            />
          </div>
          <div className="form-check my-1">
            <label htmlFor="log_returns" className="form-check-label">
              Log returns
            </label>
            <input {...attrs} />
          </div>
          <div className="d-flex justify-content-end my-5">
            <button
              type="submit"
              className="btn btn-danger"
              onClick={saveClicked}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <hr />
      </div>
      <div className="row">
        {data && data.length && data[0].report && (
          <Graph type="Portfolio" data={JSON.parse(data[0].report).data[0]} />
        )}
      </div>
    </form>
  )
}
export default Backtest
