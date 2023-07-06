import { useEffect, useState } from "react"

const StockHistory = () => {
  const [data, setData] = useState([])

  const doFetch = async () => {
    const dt = await fetch(
      "https://boursedecasablancastocks.azurewebsites.net/api/HttpTrigger1?code=VZkVkT0wQ5KMm0mqY6w6YMet-lb4p6rtQgl8bSh8kD_QAzFu3UrTPA=="
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
                <td key={index + 1}>{item.symbol}</td>
                <td key={index + 2}>{item.capitalisation}</td>
                <td key={index + 3}>{item.closingPrice}</td>
                <td key={index + 4}>{item.coursAjuste}</td>
                <td key={index + 5}>{item.coursCourant}</td>
                <td key={index + 6}>{item.cumulTitresEchanges}</td>
                <td key={index + 7}>{item.cumulVolumeEchange}</td>
                <td key={index + 8}>{item.highPrice}</td>
                <td key={index + 9}>{item.lowPrice}</td>
                <td key={index + 10}>{item.openingPrice}</td>
                <td key={index + 11}>{item.ratioConsolide}</td>
                <td key={index + 12}>{item.created}</td>
                <td key={index + 13}>{item.totalTrades}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
export default StockHistory
