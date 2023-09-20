import { useLoading } from "../store/Loading"

const PortfoliosList = ({ datalistid }) => {
  const { data } = useLoading({
    url: "/api/portfoliosmanagement/Portfolios",
    initData: [],
    cachedUrl: false,
  })

  return (
    <datalist id={datalistid}>
      {data.map((item, index) => (
        <option key={index} value={item.id}>
          {item.description}
        </option>
      ))}
    </datalist>
  )
}

export default PortfoliosList
