import { formatDate } from "../store/Utils"
import { useLoading } from "../store/Loading"
import { RuningOperationStatus } from "../store/RuningOperationStatus"
import { Pagination, usePagination } from "../components/Pagination"

const Trades = () => {
    const { data, status } = useLoading({
        url: "/api/portfoliosmanagement/Trades",
        initData: [],
        cachedUrl: false,
        filterDataCondition: (obj, value) => obj.description.startsWith(value),
    })

    const { current, first, previous, next, last, currentLable } = usePagination({
        data: data,
        size: 13,
      })

    return (
        <div className="container-fluid">
          {status === RuningOperationStatus.succeded && (
            <div className="container">
              <h4>Trades</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>Creation Date</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{formatDate(item.created)}</td>
                      <td>
                        <a href={`trade/${item.id}`}>{item.description}</a>
                      </td>
                      <td>{item.qty}</td>
                      <td>{item.price}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-end">
                <a
                  href="trade"
                  className="btn btn-danger "
                  role="button"
                  aria-pressed="true"
                >
                  Create
                </a>
              </div>
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

export default Trades