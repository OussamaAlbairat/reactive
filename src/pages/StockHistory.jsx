import { useEffect, useState } from "react"

const StockHistory = () => {
  const [data, setData] = useState([])

  const doFetch = async () => {
    const dt = await fetch(
      "https://boursedecasablancastocks.azurewebsites.net/api/StockHistory"
    )
    const js = await dt.json()
    return js
  }

  useEffect(() => {
    doFetch()
      .then((js) => {
        setData(js)
      })
      .catch((e) => alert(e))
  }, [])

  return (
    <div>
      {data.length === 0 && <h1>Loading...</h1>}
      {data.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Capitalisation</th>
              <th>Closing</th>
              <th>Adjusted</th>
              <th>Current</th>
              <th>Shares exchanged</th>
              <th>Volume</th>
              <th>High</th>
              <th>Low</th>
              <th>Open</th>
              <th>Consolidated Ratio</th>
              <th>Date</th>
              <th>Total Trades</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.symbol}</td>
                <td>{item.capitalisation}</td>
                <td>{item.closingPrice}</td>
                <td>{item.coursAjuste}</td>
                <td>{item.coursCourant}</td>
                <td>{item.cumulTitresEchanges}</td>
                <td>{item.cumulVolumeEchange}</td>
                <td>{item.highPrice}</td>
                <td>{item.lowPrice}</td>
                <td>{item.openingPrice}</td>
                <td>{item.ratioConsolide}</td>
                <td>{item.created}</td>
                <td>{item.totalTrades}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default StockHistory
