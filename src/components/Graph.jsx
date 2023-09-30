import { financial } from "../store/Utils"
import { useEffect, useRef } from "react"
import {
  plotLineGraph,
  plotMultiLineGraph,
  plotCandleSticksGraphEx,
} from "../store/Graphs"

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
    const getY = (returns_tag) => {
      const r = data[returns_tag].flatMap((x) =>
        Number.parseFloat(Number.parseFloat(x).toFixed(2))
      )
      return r.map(
        (x, i) =>
          100 + 100 * (x + r.slice(0, i).reduce((acc, y) => acc + y, 0.0))
      )
    }

    return {
      title: "Portfolio performance",
      x: data.return_dates.map((x) => new Date(x).getTime()),
      ys: [
        {
          y: getY("portfolio_returns"),
          color: "graph_green",
          legend: "Optimization",
        },
        {
          y: getY("user_defined_portfolio_returns"),
          color: "graph_white",
          legend: "User",
        },
        {
          y: getY("target_portfolio_returns"),
          color: "graph_red",
          legend: "Target",
        },
      ],
    }
  }

  useEffect(() => {
    const plotElm = refPlot.current
    if (type == "Bond") (async () => await plotLineGraph(plotElm, getXandY()))()
    else if (type == "Stock")
      (async () => await plotCandleSticksGraphEx(plotElm, getCandelData()))()
    else if (type == "Portfolio")
      (async () => await plotMultiLineGraph(plotElm, getPortfolioXandY()))()
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
