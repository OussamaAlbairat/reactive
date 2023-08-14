import { newId, financial, formatDate, isInteger } from "../store/Utils"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useLoading } from "../store/Loading"
import { useSaving } from "../store/Saving"
import StocksList from "../components/StocksList"
import { RuningOperationStatus } from "../store/RuningOperationStatus"
import RuningOperationSpinner from "../components/RuningOperationSpinner"

const Portfolio = () => {
  const { id } = useParams()

  const [runingOperationStatus, setRuningOperationStatus] = useState(
    RuningOperationStatus.notStarted
  )

  const { data, setData } = useLoading({
    url: isInteger(id) ? `/api/portfolio?id=${id}` : null,
    initData: [
      { id: id || -1, created: "", description: "", report: '{ "stocks":[]}' },
    ],
    setRuningOperationStatus,
    cachedUrl: false,
    cors: true,
  })

  const { save } = useSaving({
    url: "/api/portfolio",
    setRuningOperationStatus,
  })

  const inputChanged = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData((old) => {
      return [{ ...old[0], [name]: value }]
    })
  }

  const addClicked = (e) => {
    e.preventDefault()
    setData((old) => {
      const oldReport = JSON.parse(old[0].report)
      const newStocks = oldReport.stocks
      newStocks.push({ id: newId(), symbol: "NEW", ratio: 0.1 })
      return [{ ...old[0], report: JSON.stringify({ stocks: [...newStocks] }) }]
    })
  }

  const saveClicked = (e) => {
    e.preventDefault()
    save(data[0]).then((dt) => {
      setData(dt)
    })
  }

  const changeStock = (stockid, field, value) => {
    setData((old) => {
      const oldReport = JSON.parse(old[0].report)
      const newStocks = oldReport.stocks
      newStocks.find((x) => x.id == stockid)[field] = value

      return [{ ...old[0], report: JSON.stringify({ stocks: [...newStocks] }) }]
    })
  }

  const ratioChanged = (e) => {
    e.preventDefault()
    const value = e.target.value
    const { stockid } = e.target.dataset
    changeStock(
      stockid,
      "ratio",
      Number.parseFloat(value.replace("%", "")) / 100
    )
  }

  const symbolChanged = (e) => {
    e.preventDefault()
    const value = e.target.value
    const { stockid } = e.target.dataset
    changeStock(stockid, "symbol", value)
  }

  const deleteStock = (e) => {
    e.preventDefault()
    const { stockid } = e.target.dataset
    setData((old) => {
      const oldReport = JSON.parse(old[0].report)
      const oldStocks = oldReport.stocks
      const newStocks = oldStocks.filter((x) => x.id != stockid)

      return [{ ...old[0], report: JSON.stringify({ stocks: [...newStocks] }) }]
    })
  }

  return (
    <div className="container">
      <RuningOperationSpinner status={runingOperationStatus} />
      <h4>Portfolio</h4>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {JSON.parse(data[0].report).stocks.map((stock, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      list="stocksdatalist"
                      type="text"
                      name="symbol"
                      value={stock.symbol}
                      onChange={symbolChanged}
                      data-stockid={stock.id || newId()}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="ratio"
                      value={financial(stock.ratio * 100) + "%"}
                      onChange={ratioChanged}
                      data-stockid={stock.id || newId()}
                    />
                  </td>
                  <td>
                    <a href="#" className="d-flex justify-content-end">
                      <i
                        className="bi bi-x-lg"
                        data-stockid={stock.id || newId()}
                        onClick={deleteStock}
                      ></i>
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="d-flex justify-content-end my-5">
          <button
            type="submit"
            className="btn btn-danger mx-2"
            onClick={addClicked}
          >
            Add
          </button>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={saveClicked}
          >
            Save
          </button>
        </div>
      </form>
      <StocksList datalistid="stocksdatalist" />
    </div>
  )
}

export default Portfolio
