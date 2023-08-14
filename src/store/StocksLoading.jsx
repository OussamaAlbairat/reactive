import { useLoading } from "./Loading"

export const useStocksLoading = ({ setRuningOperationStatus }) => {
  const { data, setData } = useLoading({
    url: "/api/boursedecasablancastocks/Stocks?type=All",
    initData: [],
    setRuningOperationStatus,
    cachedUrl: true,
  })
  return { data, setData }
}
