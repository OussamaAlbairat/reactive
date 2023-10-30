import { useLoading } from "./Loading"

export const useStocksLoading = () => {
  const { data, setData, status } = useLoading({
    url: "/api/boursedecasablancastocks/Stocks?type=All",
    initData: [],
    cachedUrl: true,
    filterDataCondition: (obj, value) =>
      (obj.symbol && obj.symbol.includes(value)) ||
      (obj.description && obj.description.includes(value)) ||
      (obj.company && obj.company.includes(value)) ||
      (obj.type && obj.type.includes(value)),
    authorize: false,
  })
  return { data, setData, status }
}
