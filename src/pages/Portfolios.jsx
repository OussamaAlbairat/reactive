import { useState } from "react"
import { useLoading } from "../store/Loading"
import { useSearch } from "../store/Searching"
import { RuningOperationStatus } from "../store/RuningOperationStatus"
import RuningOperationSpinner from "../components/RuningOperationSpinner"

const Portfolios = () => {
  const [runingOperationStatus, setRuningOperationStatus] = useState(
    RuningOperationStatus.notStarted
  )
  const { data, setData } = useLoading({
    url: "https://portfoliosmanagement.azurewebsites.net/api/Portfolios",
    initData: [],
    setRuningOperationStatus,
  })

  const { searchData } = useSearch({
    data,
    setData,
    runingOperationStatus,
    filterData: (obj, value) => obj.description.startsWith(value),
  })

  return (
    <div className="container-fluid">
      <RuningOperationSpinner status={runingOperationStatus} />
      {runingOperationStatus === RuningOperationStatus.succeded && (
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
      )}
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
  )
}
export default Portfolios
