import { useLoading } from "../store/Loading"
import { useSearch } from "../store/Searching"
import { RuningOperationStatus } from "../store/RuningOperationStatus"

const Portfolios = () => {
  const { data, setData, status, done } = useLoading({
    url: "/api/portfoliosmanagement/Portfolios",
    initData: [],
    cachedUrl: false,
  })

  const { searchData } = useSearch({
    data,
    setData,
    status,
    loadingDone: done,
    filterDataCondition: (obj, value) => obj.description.startsWith(value),
  })

  return (
    <div className="container-fluid">
      {status === RuningOperationStatus.succeded && (
        <div className="container">
          <h4>Portfolios</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Creation Date</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {searchData.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.created}</td>
                  <td>
                    <a href={`portfolio/${item.id}`}>{item.description}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-end">
            <a
              href="portfolio"
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
export default Portfolios
