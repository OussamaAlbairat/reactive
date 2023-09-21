import { useLoading } from "../store/Loading"

const PortfoliosList = ({ selectId, portfolioId, setPortfolioId }) => {
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
      <select id={selectId} name={selectId} onChange={inputChanged}>
        {data.map((item, index) => {
          let attr = {
            key: index,
            value: item.id,
          }
          if (item.id == portfolioId) attr.selected = "true"
          return <option {...attr}>{item.description}</option>
        })}
      </select>
    </>
  )
}

export default PortfoliosList
