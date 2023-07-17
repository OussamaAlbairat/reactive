import { useState, useEffect } from "react"

export const usePagination = ({ data, size }) => {
  const [index, setIndex] = useState(0)

  const current = () => {
    return data.slice(index, index + size)
  }
  const first = () => {
    setIndex(0)
  }
  const previous = () => {
    const newIndex = index - size
    if (newIndex > 0) setIndex(newIndex)
    else first()
  }
  const next = () => {
    const newIndex = index + size
    if (newIndex < data.length) setIndex(newIndex)
    else last()
  }
  const last = () => {
    setIndex(data.length - (data.length % size))
  }
  const currentLable = () => {
    const currentPage = Math.ceil((index + 1) / size)
    const countOfPages = Math.ceil(data.length / size)
    return `${currentPage} / ${countOfPages}`
  }

  useEffect(() => first(), [data])

  return { current, first, previous, next, last, currentLable }
}

const PaginationItem = ({ action, iconClass }) => {
  return (
    <a
      href=""
      onClick={(e) => {
        e.preventDefault()
        action()
      }}
      className="mx-1"
    >
      <i className={iconClass}></i>
    </a>
  )
}

export const Pagination = ({ first, previous, next, last, currentLable }) => {
  return (
    <div className="d-flex justify-content-center my-2">
      <PaginationItem action={first} iconClass="bi bi-chevron-double-left" />
      <PaginationItem action={previous} iconClass="bi bi-chevron-left" />
      <span>{currentLable()}</span>
      <PaginationItem action={next} iconClass="bi bi-chevron-right" />
      <PaginationItem action={last} iconClass="bi bi-chevron-double-right" />
    </div>
  )
}
