import { useSearch } from "../store/Searching"
import { RuningOperationStatus } from "../store/RuningOperationStatus"
import { Pagination, usePagination } from "../components/Pagination"

import { useStocksLoading } from "../store/StocksLoading"
import { Link } from "react-router-dom"

const Stocks = () => {
  const { data, status } = useStocksLoading()

  const { current, first, previous, next, last, currentLable } = usePagination({
    data: data,
    size: 13,
  })

  return (
    <div>
      {status === RuningOperationStatus.succeded && (
        <div className="container">
          <h4>Instruments</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Symbol</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {current().map((item, index) => (
                <tr key={index}>
                  <td>{item.company}</td>
                  <td>{item.symbol}</td>
                  <td>
                    <Link
                      relative="path"
                      to={`../stock/${item.instrument_id}`}
                      state={{
                        symbol: item.symbol,
                        company: item.company,
                        type: item.type,
                      }}
                    >
                      {item.description}
                    </Link>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            first={first}
            previous={previous}
            next={next}
            last={last}
            currentLable={currentLable}
          />
        </div>
      )}
    </div>
  )
}

export default Stocks
