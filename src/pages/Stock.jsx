import { isInteger } from "../store/Utils"
import { useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useLoading } from "../store/Loading"
import { RuningOperationStatus } from "../store/RuningOperationStatus"
import RuningOperationSpinner from "../components/RuningOperationSpinner"
import Graph from "../components/Graph"

const Stock = () => {
  const { id } = useParams()
  const location = useLocation()

  const [runingOperationStatus, setRuningOperationStatus] = useState(
    RuningOperationStatus.notStarted
  )

  const { data, setData } = useLoading({
    url: isInteger(id)
      ? `/api/boursedecasablancastocks/stockhistory?type=${location.state?.type}&instrument_id=${id}`
      : null,
    initData: [],
    setRuningOperationStatus,
    cachedUrl: false,
  })

  return (
    <div className="container">
      <h4>{`${location.state?.type}: ${location.state?.company}(${location.state?.symbol})`}</h4>
      <RuningOperationSpinner status={runingOperationStatus} />
      {runingOperationStatus == RuningOperationStatus.succeded && (
        <Graph type={location.state?.type} data={data} />
      )}
    </div>
  )
}

export default Stock
