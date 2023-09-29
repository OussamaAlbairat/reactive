import { financial } from "../store/Utils"
import { useEffect, useRef } from "react"
import { plotLineGraph, plotCandleSticksGraphEx } from "../store/Graphs"

const Graph = ({ type, data }) => {
  const refPlot = useRef()

  const getXandY = () => {
    const graphData = data.reverse()
    return {
      x: graphData.map((x) => new Date(x.created).getTime()),
      y: graphData.map((x) => financial(x.staticReferencePrice)),
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

  const getPortfolioXandY = () => {
    return {
      x: data.return_dates.map((x) => new Date(x).getTime()),
      y: data.target_portfolio_returns.map((x) => financial(x)),
    }
  }

  useEffect(() => {
    const plotElm = refPlot.current
    if (type == "Bond") (async () => await plotLineGraph(plotElm, getXandY()))()
    else if (type == "Stock")
      (async () => await plotCandleSticksGraphEx(plotElm, getCandelData()))()
    else if (type == "Portfolio")
      (async () => await plotLineGraph(plotElm, getPortfolioXandY()))()
  }, [data])

  return (
    <div
      ref={refPlot}
      id="plot"
      className="d-flex justify-content-center"
      style={{ height: "500px" }}
    />
  )
}

export default Graph
