import { useStocksLoading } from "../store/StocksLoading"

const StocksList = ({ datalistid }) => {
  const { data } = useStocksLoading()

  return (
    <datalist id={datalistid}>
      {data.map((item, index) => (
        <option key={index} value={item.symbol} data-value={item.instrument_id}>
          {item.company == item.description
            ? `${item.symbol}-${item.company}`
            : `${item.symbol}-${item.company}(${item.description})`}
        </option>
      ))}
    </datalist>
  )
}

export default StocksList
