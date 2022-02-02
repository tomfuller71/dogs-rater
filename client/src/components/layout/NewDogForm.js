import React, { useState } from "react"
import ErrorList from "./ErrorList.js"

import Fetcher from "./services/Fetcher.js"

const NewDogForm = props => {
  const [newDog, setNewDog] = useState({
    name: "",
    pictureUrl: "",
    description: ""
  })

  const [errors, setErrors] = useState([])
  const [pictureUrl, setPictureUrl] = useState("")

  const getNewDog = async () => {
    const id = props.match.params.id
   const response = await Fetcher.post(`/api/v1/users/${id}/new`, newDog)
   debugger
    if(response.ok) {
      //redirect to show
    } else { 
      return setErrors(response.validationErrors)
    }
  }

  const handleInputChange = event => {
    const { name, value } = event.currentTarget
    setNewDog({
      ...newDog,
      [name]: value
    })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    getNewDog()
  }

  const clearForm = () => {
    setNewDog({
      name: "",
      pictureUrl: "",
      description: ""
    })
  }

  const testPicture = (event) => {
    event.preventDefault()
    setPictureUrl(newDog.pictureUrl)
  }

  let picture = null
  if (pictureUrl) {
    picture = (<img src={pictureUrl} alt="test dog picture"/>)
  }

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        <div className="cell small-10 medium-8">
          <h1>Add a New Dog</h1>
          <ErrorList errors={errors} />
          <form onSubmit={handleSubmit}>
            <label>Name:
              <input 
              type="text"
              name="name"
              value = {newDog.name}
              onChange={handleInputChange}
              />
            </label>

            <label>Picture (URL):
              <input
              type="text"
              name="pictureUrl"
              onChange={handleInputChange}
              value={newDog.pictureUrl}
              />
            </label>

            <label>Description (Optional):
              <input
                type="text"
                name="description"
                onChange={handleInputChange}
                value={newDog.description}
              />
            </label>
            <div className ="button-group">
              <input 
                className="button"
                type="submit"
                value="Submit"
              />
              <input
                className="button"
                type="button"
                value="Clear Form"
                onClick={clearForm}
              />
              <input
                className="button"
                type="button"
                value="Test URL"
                onClick={testPicture}
              />
            </div>
          </form>
          <div>
            {picture}
          </div>
        </div>
      </div>
    </div>  
  )
}

export default NewDogForm