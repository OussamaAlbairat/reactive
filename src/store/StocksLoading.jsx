import { useLoading } from "./Loading"

export const useStocksLoading = () => {
  const { data, setData, status } = useLoading({
    url: "/api/boursedecasablancastocks/Stocks?type=All",
    initData: [],
    cachedUrl: true,
  })
  return { data, setData, status }
}
