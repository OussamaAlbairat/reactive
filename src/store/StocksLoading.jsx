import { useLoading } from "./Loading"

export const useStocksLoading = () => {
  const { data, setData, status } = useLoading({
    url: "/api/boursedecasablancastocks/Stocks?type=All",
    initData: [],
    cachedUrl: true,
    filterDataCondition: (obj, value) => obj.symbol.startsWith(value),
  })
  return { data, setData, status }
}
