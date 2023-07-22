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
