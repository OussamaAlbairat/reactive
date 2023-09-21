import { formatDate } from "../store/Utils"
import { Link } from "react-router-dom"
import { useLoading } from "../store/Loading"
import { RuningOperationStatus } from "../store/RuningOperationStatus"
import { Pagination, usePagination } from "../components/Pagination"

function Backtests() {
  const { data, status } = useLoading({
    url: "/api/portfoliosmanagement/backtests",
    initData: [],
    cachedUrl: false,
    filterDataCondition: (obj, value) => obj.description.startsWith(value),
  })

  const { current, first, previous, next, last, currentLable } = usePagination({
    data: data,
    size: 13,
  })

  return (
    <div>
      {status === RuningOperationStatus.succeded && (
        <div className="container">
          <h4>Backtests</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Created</th>
                <th>Description</th>
                <th>Portfolio</th>
              </tr>
            </thead>
            <tbody>
              {current().map((item, index) => (
                <tr key={index}>
                  <td>{formatDate(item.created)}</td>
                  <td>
                    <Link relative="path" to={`../backtest/${item.id}`}>
                      {item.description}
                    </Link>
                  </td>
                  <td>
                    <Link relative="path" to={`../backtest/${item.id}`}>
                      {item.portfolio_description}
                    </Link>
                  </td>
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
          <div className="d-flex justify-content-end">
            <a
              href="backtest"
              className="btn btn-danger "
              role="button"
              aria-pressed="true"
            >
              Create
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Backtests
