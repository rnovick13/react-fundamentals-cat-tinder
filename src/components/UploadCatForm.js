import React from 'react'

class UploadCatForm extends React.Component {
    constructor(){
      super()
      this.state = {
        formInput: {
          name: "",
          image_url: "",
          status: "undecided",
        }
      }
    }

    handleChange = (event) => {
      const { name, value } = event.target
      this.setState({
        formInput: {
          ...this.state.formInput,
          [name]: value
        }
      })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      const headers = {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(this.state.formInput)
      }

      fetch("http://localhost:3001/cats", headers)
        .then(r => r.json())
        .then(console.log)
    }

    render() {
      return (
        <div className="UploadCatFormDiv">
        <h4>Upload a Cat</h4>
          <form className="UploadCatForm" onSubmit={this.handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="name"
              value={this.state.formInput.name}
              onChange={this.handleChange}
            />
            <input
              name="image_url"
              type="text"
              placeholder="image_url"
              value={this.state.formInput.image_url}
              onChange={this.handleChange}
            />
            <input
              type="submit"
              value="Upload a Cat"
            />

          </form>
        </div>

      )
    }
}

export default UploadCatForm
