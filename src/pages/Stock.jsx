import { useLocation, useParams } from "react-router-dom"
import { useLoading } from "../store/Loading"
import { RuningOperationStatus } from "../store/RuningOperationStatus"
import Graph from "../components/Graph"

const Stock = () => {
  const { id } = useParams()
  const location = useLocation()

  const { data, status } = useLoading({
    url:
      `/api/boursedecasablancastocks/stockhistory?type=${location.state?.type}&instrument_id=${id}`,
    initData: [],
    cachedUrl: false,
  })

  return (
    <div className="container">
      {status == RuningOperationStatus.succeded && (
        <div>
          <h4>{`${location.state?.type}: ${location.state?.company}(${location.state?.symbol})`}</h4>
          <Graph type={location.state?.type} data={data} />
        </div>
      )}
    </div>
  )
}

export default Stock
