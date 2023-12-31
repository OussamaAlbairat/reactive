import { msalConfig } from "../authConfig"

export const newId = () => Math.floor(Math.random() * 10 ** 15)

export const financial = (x) => Number.parseFloat(x).toFixed(2)

export const formatDate = (date) => {
  const dt = new Date(date)
  return dt.toJSON()?.split("T")[0]
}

export const isInteger = (a) => {
  return !Number.isNaN(Number.parseInt(a))
}

export const strToBool = (value) => {
  const trues = ["true", "t", "1"]
  const falses = ["false", "f", "0"]
  if (typeof value === "boolean") return value
  if (typeof value !== "string") throw "not a string value"
  if (trues.includes(value.toLowerCase())) return true
  if (falses.includes(value.toLowerCase())) return false
  throw "not a supported value"
}

export const getAccessToken = async (authorize, instance) => {
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

export const getApiData = async ({ uri, accessToken, initData }) => {
  const headers = accessToken ? new Headers() : null
  headers && headers.append("Authorization", `Bearer ${accessToken}`)
  const options = headers
    ? { method: "GET", headers: headers }
    : { method: "GET" }
  const resp = uri ? await fetch(uri, options) : null
  const dt = resp ? await resp.json() : null
  return dt || { status: "OK", message: "url not provided", data: initData }
}

// const getApiDataWithAuth = async ({ url, accessToken }) => {
//   try {
//     const tokenResponse = await msalInstance.acquireTokenSilent({
//       scopes: msalConfig.api.scopes,
//       account: msalInstance.getAllAccounts()[0],
//     })
//     const headers = new Headers()
//     headers.append("Authorization", `Bearer ${tokenResponse.accessToken}`)
//     const response = await fetch(url, { method: "GET", headers: headers })
//     try {
//       if (response.ok) return await response.json()
//       else throw new Error(await response.json().message)
//     } catch (error) {
//       console.log("Error: " + error)
//     }
//   } catch (error) {
//     console.log("Error Acquiring Token Silently: " + error)
//     msalInstance.acquireTokenRedirect({
//       scopes: config.api.scopes,
//       forceRefresh: false,
//     })
//   }
//   return null
// }

export const postApiData = async (url, accessToken, data = {}) => {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  if (accessToken) headers.append("Authorization", `Bearer ${accessToken}`)
  // Default options are marked with *
  const resp = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "same-origin", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: headers, // 'Content-Type': 'application/x-www-form-urlencoded', application/json
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return await resp.json() // parses JSON response into native JavaScript objects
}

export const postApiDataWithCors = async (url, data = {}) => {
  // Default options are marked with *
  const resp = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return await resp.json() // parses JSON response into native JavaScript objects
}
