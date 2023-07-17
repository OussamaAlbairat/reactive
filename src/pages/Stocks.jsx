import { useState } from "react"
import { useLoading } from "../store/Loading"
import { useSearch } from "../store/Searching"
import { RuningOperationStatus } from "../store/RuningOperationStatus"
import RuningOperationSpinner from "../components/RuningOperationSpinner"
import { Pagination, usePagination } from "../components/Pagination"

const Stocks = () => {
  const [runingOperationStatus, setRuningOperationStatus] = useState(
    RuningOperationStatus.notStarted
  )

  const { data, setData } = useLoading({
    url: "https://boursedecasablancastocks.azurewebsites.net/api/Stocks?",
    initData: [],
    setRuningOperationStatus,
  })

  const { searchData } = useSearch({
    data,
    setData,
    runingOperationStatus,
    filterDataCondition: (obj, value) => obj.symbol.startsWith(value),
  })

  const { current, first, previous, next, last, currentLable } = usePagination({
    data: data,
    size: 13,
  })

  return (
    <div>
      <RuningOperationSpinner status={runingOperationStatus} />
      {runingOperationStatus === RuningOperationStatus.succeded && (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Symbol</th>
                <th>Description</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {current().map((item, index) => (
                <tr key={index}>
                  <td>{item.company}</td>
                  <td>{item.symbol}</td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
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
        </>
      )}
    </div>
  )
}

export default Stocks
