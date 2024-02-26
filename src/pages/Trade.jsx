import { financial, formatDate, isInteger } from "../store/Utils"
import { useParams } from "react-router-dom"
import { useLoading } from "../store/Loading"
import { useSaving } from "../store/Saving"
import StocksList from "../components/StocksList"
import PortfoliosList from "../components/PortfoliosList"

const Trade = () => {
    const { id } = useParams()

    const { data, setData } = useLoading({
      url: isInteger(id) ? `/api/portfoliosmanagement/trades?id=${id}` : null,
      initData: [
        { id: id || -1, created: "", stock_id:-1, qty:0.0, amount:0.0, type:"buy"
        , portfolio_id:-1, user_id:-1, price:0.0, description: "",  },
      ],
      cachedUrl: false,
    })
  
    const { save } = useSaving({ url: "/api/portfoliosmanagement/trades" })

    const inputChanged = (e) => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
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

    return (
        <div className="row">
          <div className="col-sm-4">
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
              <label htmlFor="stock">Stock</label>
              <input
                list="stocksdatalist"
                type="text"
                name="stock"
                className="form-control"
                value={data[0].description}
                onChange={inputChanged}
                data-stockid={data[0].stock_id}
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
          <div className="col-sm-4">
            <div className="form-group my-1">
              <label htmlFor="qty">Quantity</label>
              <input
                id="qty"
                name="qty"
                type="number"
                className="form-control"
                onChange={inputChanged}
                value={financial(data[0].qty)}
              />
            </div>
            <div className="form-group my-1">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                className="form-control"
                onChange={inputChanged}
                value={financial(data[0].price)}
              />
            </div>            
            <div className="form-group my-1">
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                name="amount"
                type="number"
                className="form-control"
                onChange={inputChanged}
                value={financial(data[0].amount)}
              />
            </div>            
            <div className="d-flex justify-content-end my-4">
              <button
                type="submit"
                className="btn btn-danger"
                onClick={saveClicked}
              >
                Save
              </button>
            </div>
          </div>
          <StocksList datalistid="stocksdatalist" />
        </div>
      )
}

export default Trade