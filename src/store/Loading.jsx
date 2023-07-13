import { useState, useEffect } from "react"

export const Loading = {
  succeded: Symbol(0),
  failed: Symbol(1),
  started: Symbol(2),
  notStarted: Symbol(3),
}

export const useLoading = ({ url, initData }) => {
  const [data, setData] = useState(initData)
  const [loading, setLoading] = useState(Loading.notStarted)

  const doFetch = async () => {
    const resp = await fetch(url)
    const data = await resp.json()
    return data
  }

  useEffect(() => {
    setLoading(Loading.started)
    doFetch()
      .then((dt) => {
        const { status, message, data } = dt
        setData(data)
        if (status === "OK") setLoading(Loading.succeded)
        else setLoading(Loading.failed)
      })
      .catch((e) => setLoading(Loading.failed))
  }, [])

  return { data, setData, loading }
}
