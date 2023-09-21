import { useLoading } from "../store/Loading"

const PortfoliosList = ({ selectId, setPortfolioId }) => {
  const { data } = useLoading({
    url: "/api/portfoliosmanagement/Portfolios",
    initData: [],
    cachedUrl: false,
  })

  const inputChanged = (e) => {
    e.preventDefault()
    const value = e.target.value
    setPortfolioId(value)
  }

  return (
    <>
      <select id={selectId} changed={inputChanged}>
        {data.map((item, index) => (
          <option key={index} value={item.id}>
            {item.description}
          </option>
        ))}
      </select>
    </>
  )
}

export default PortfoliosList
