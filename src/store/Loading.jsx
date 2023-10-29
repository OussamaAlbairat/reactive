import { useState, useEffect, useContext } from "react"
import {
  RuningOperationStatus,
  RuningOperationStatusContext,
} from "./RuningOperationStatus"
import useRegistry from "./Registry"
import { useMsal } from "@azure/msal-react"
import { msalConfig } from "../authConfig"
import { getApiData } from "./Utils"

const cache = new Map()

export const useLoading = ({
  url,
  initData,
  cachedUrl = false,
  filterDataCondition = null,
  showAlert = false,
  authorize = true,
}) => {
  const { instance } = useMsal()
  const [data, setData] = useState(initData)
  const { subscribe, unsubscribe } = useRegistry()
  const { status, setStatus, setMessage, setShowAlert } = useContext(
    RuningOperationStatusContext
  )

  const setOperationContext = (status, message) => {
    setStatus(status)
    setMessage(message)
    if (!showAlert) setShowAlert(showAlert)
  }

  const getDataOrCache = async (uri) => {
    if (cachedUrl && cache.has(uri)) return cache.get(uri)
    else if (cachedUrl) return cache.set(uri, await getData(uri)).get(uri)
    else return await getData(uri)
  }

  const getData = async (uri) => {
    const accessToken = await getAccessToken()
    console.log("accessToken", accessToken)
    return await getApiData({ uri, accessToken, initData })
  }

  const getAccessToken = async () => {
    if (!authorize) return null
    const accounts = instance.getAllAccounts()
    const account = accounts && accounts.length > 0 ? accounts[0] : null
    if (!account) return null
    const tokenResponse = await instance.acquireTokenSilent({
      scopes: msalConfig.api.scopes,
      account: account,
    })
    return tokenResponse.accessToken
  }

  useEffect(() => {
    let result = { unsubscribe: null }

    const run = async () => {
      try {
        setOperationContext(RuningOperationStatus.started, "")
        const { status, message, data } = await getDataOrCache(url)
        if (status === "OK") {
          setData(data || initData)

          setOperationContext(RuningOperationStatus.succeded, message)

          if (filterDataCondition) {
            const search = (value) => {
              if (value === "") setData(data)
              else {
                const filteredData = data.filter((obj) =>
                  filterDataCondition(obj, value)
                )
                setData(filteredData)
              }
            }
            subscribe("SEARCH", search)
            result.unsubscribe = () => unsubscribe("SEARCH", search)
          }
        } else setOperationContext(RuningOperationStatus.failed, message)
      } catch (ex) {
        setOperationContext(
          RuningOperationStatus.failed,
          "An exception occured."
        )
        console.log(ex)
      }
    }
    run()

    return () => result.unsubscribe && result.unsubscribe()
  }, [])

  return { data, setData, status }
}
