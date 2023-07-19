import { useState } from "react"
import { useStocksLoading } from "../store/StocksLoading"
import { RuningOperationStatus } from "../store/RuningOperationStatus"

const StocksList = ({ datalistid }) => {
  const [runingOperationStatus, setRuningOperationStatus] = useState(
    RuningOperationStatus.notStarted
  )
  const { data, setData } = useStocksLoading({ setRuningOperationStatus })

  return (
    <datalist id={datalistid}>
      {data.map((item, index) => (
        <option key={index} value={item.symbol}>
          {item.company == item.description
            ? `${item.symbol}-${item.company}`
            : `${item.symbol}-${item.company}(${item.description})`}
        </option>
      ))}
    </datalist>
  )
}

export default StocksList
