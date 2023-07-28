import { useLoading } from "./Loading"

export const useStocksLoading = ({ setRuningOperationStatus }) => {
  const { data, setData } = useLoading({
    url: "https://boursedecasablancastocks.azurewebsites.net/api/Stocks?type=All",
    initData: [],
    setRuningOperationStatus,
    cachedUrl: true,
  })
  return { data, setData }
}
