import { Loading, useLoading } from "../store/Loading"
import LoadingSpinner from "../components/LoadingSpinner"
import { useSearch } from "../store/Searching"

const Stocks = () => {
  const { data, setData, loading } = useLoading({
    url: "https://boursedecasablancastocks.azurewebsites.net/api/Stocks?",
    initData: [],
  })

  const { searchData } = useSearch({
    data,
    setData,
    loading,
    filterData: (obj, value) => obj.symbol.startsWith(value),
  })

  return (
    <div>
      <LoadingSpinner loading={loading} />
      {loading === Loading.succeded && (
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
            {searchData.map((item, index) => (
              <tr key={index}>
                <td>{item.company}</td>
                <td>{item.symbol}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Stocks
