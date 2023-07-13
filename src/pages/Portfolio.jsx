import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useLoading, Loading } from "../store/Loading"

const Portfolio = () => {
  const { id } = useParams() || -1

  //const [formData, setFormData] = useState({ id })

  const { formData, setFormData, loading } = useLoading({
    url: `https://portfoliosmanagement.azurewebsites.net/api/portfolio?id=${id}`,
    initData: { id },
  })

  const inputChanged = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData((old) => {
      return { ...old, [name]: value }
    })
  }

  const saveClicked = (e) => {
    e.preventDefault()
    axios
      .post(
        "https://portfoliosmanagement.azurewebsites.net/api/portfolio",
        formData
      )
      .then((resp) => {})
      .catch((err) => {})
  }

  return (
    <div className="container-fluid">
      <Loading loading={loading} />
      {loading === Loading.succeded && (
        <form>
          <div className="form-group">
            <label htmlFor="created">Created</label>
            <input
              id="created"
              name="created"
              type="date"
              className="form-control"
              aria-describedby="createdHelp"
              onChange={inputChanged}
            />
            <small id="createdHelp" className="form-text text-muted">
              Date the portfolio is created.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              aria-describedby="descriptionHelp"
              onChange={inputChanged}
            />
            <small id="descriptionHelp" className="form-text text-muted">
              Describe briefly your portfolio.
            </small>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-danger"
              onClick={saveClicked}
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Portfolio
