const Contact = () => {
  const sendClicked = (e) => {
    e.preventDefault()
    alert("Thanks for sharing this comment with us.")
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6 offset-2 py-5">
          <h1>Direct Portfolio Management</h1>
          <p>
            We will be happy to hear from you, send us any comments regarding
            the application or questions related to portfolio management.
          </p>
          <form className="form">
            <div className="form-group">
              <label htmlFor="comment">Comment</label>
              <textarea id="comment" name="comment" className="form-control" />
            </div>
            <div className="d-flex justify-content-end my-5">
              <button
                type="submit"
                className="btn btn-danger"
                onClick={sendClicked}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Contact
