export const newId = () => Math.floor(Math.random() * 10 ** 15)

export const financial = (x) => Number.parseFloat(x).toFixed(2)

export const formatDate = (date) => {
  const dt = new Date(date)
  return `${dt.getFullYear()}-${(dt.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${(dt.getDate() + 1).toString().padStart(2, "0")}`
}

export const isInteger = (a) => {
  return !Number.isNaN(Number.parseInt(a))
}

export const getApiData = async (url) => {
  const resp = await fetch(url, {
    headers: {
      "X-Custom-TZ": new Date().getTimezoneOffset(),
    },
  })
  if (!resp.ok) throw new Error("response not OK")
  const data = await resp.json()
  return data
}

export const postApiData = async (url, data = {}) => {
  // Default options are marked with *
  const resp = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "same-origin", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "X-Custom-TZ": new Date().getTimezoneOffset(),
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
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
