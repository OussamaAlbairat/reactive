import { Loading, useLoading } from "../store/Loading"
import LoadingSpinner from "../components/LoadingSpinner"
import { useSearch } from "../store/Searching"

const Portfolios = () => {
  const { data, setData, loading } = useLoading({
    url: "https://portfoliosmanagement.azurewebsites.net/api/Portfolios",
    initData: [],
  })

  const { searchData } = useSearch({
    data,
    setData,
    loading,
    filterData: (obj, value) => obj.description.startsWith(value),
  })

  return (
    <div className="container-fluid">
      <LoadingSpinner loading={loading} />
      {loading === Loading.succeded && (
        <table className="table">
          <thead>
            <tr>
              <th>Creation Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {searchData.map((item, index) => (
              <tr key={item.id}>
                <td>{item.created}</td>
                <td>
                  <a href={`portfolio/${item.id}`}>{item.description}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="d-flex justify-content-end">
        <a
          href="portfolio"
          className="btn btn-danger "
          role="button"
          aria-pressed="true"
        >
          Create
        </a>
      </div>
    </div>
  )
}
export default Portfolios
