import { newId, financial, isInteger } from "../store/Utils"
import { useState, useEffect, useRef } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useLoading } from "../store/Loading"
import { plotLineGraph, plotCandleSticksGraphEx } from "../store/Graphs"
import { RuningOperationStatus } from "../store/RuningOperationStatus"
import RuningOperationSpinner from "../components/RuningOperationSpinner"

const Stock = () => {
  const refPlot = useRef()
  const { id } = useParams()
  const location = useLocation()

  const [runingOperationStatus, setRuningOperationStatus] = useState(
    RuningOperationStatus.notStarted
  )

  const { data, setData } = useLoading({
    url: isInteger(id)
      ? `https://boursedecasablancastocks.azurewebsites.net/api/stockhistory?instrument_id=${id}`
      : null,
    initData: [],
    setRuningOperationStatus,
  })

  const getXandY = () => {
    return {
      x: data.map((x) => new Date(x.created).getTime()),
      y: data.map((x) => financial(x.closingPrice)),
    }
  }

  const getCandelData = () => {
    const candelData = data.reverse()
    return {
      date: candelData.map((x) => new Date(x.created).getTime()),
      open: candelData.map((x) => financial(x.openingPrice)),
      close: candelData.map((x) => financial(x.closingPrice)),
      low: candelData.map((x) => financial(x.lowPrice)),
      high: candelData.map((x) => financial(x.highPrice)),
    }
  }

  useEffect(() => {
    const plotElm = refPlot.current
    //plotLineGraph(plotElm, getXandY())
    plotCandleSticksGraphEx(plotElm, getCandelData())
  }, [data])

  return (
    <div className="container">
      <RuningOperationSpinner status={runingOperationStatus} />
      <h4>Stock: {`${location.state?.company}(${location.state?.symbol})`}</h4>
      <div
        ref={refPlot}
        id="plot"
        className="d-flex justify-content-center"
        style={{ height: "500px" }}
      />
    </div>
  )
}

export default Stock
