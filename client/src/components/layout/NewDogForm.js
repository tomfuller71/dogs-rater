import React, { useState } from "react"
import { Redirect } from "react-router-dom";

import Fetcher from "./services/Fetcher.js";
import ErrorList from "./ErrorList.js"

const NewDogForm = ({ user }) => {
  const defaultFormValue = {
    dogName: "",
    pictureUrl: "",
    description: ""
  };

  const [newDog, setNewDog] = useState(defaultFormValue);
  const [errors, setErrors] = useState([]);
  const [pictureUrl, setPictureUrl] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const getNewDog = async () => {
    const response = await Fetcher.post(`/api/v1/dogs/new`, newDog);
    if (response.ok) {
      return setShouldRedirect(true);
    }
    setErrors(response.validationErrors);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    setNewDog({
      ...newDog,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getNewDog();
  };

  const clearForm = () => {
    setNewDog(defaultFormValue);
  };

  const testPicture = () => {
    setPictureUrl(newDog.pictureUrl);
  };

  if (shouldRedirect) {
    return <Redirect push to="/" />;
  }

  let picture = null;
  if (pictureUrl) {
    picture = <img src={pictureUrl} alt="test dog picture" />;
  }

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        <div className="cell small-10 medium-8">
          <h1>Add a New Dog</h1>
          <ErrorList errors={errors} />
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="dogName"
                value={newDog.dogName}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Picture (URL):
              <input
                type="text"
                name="pictureUrl"
                onChange={handleInputChange}
                value={newDog.pictureUrl}
              />
            </label>

            <label>
              Description (Optional):
              <input
                type="text"
                name="description"
                onChange={handleInputChange}
                value={newDog.description}
              />
            </label>
            <div className="button-group">
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
  );
};

export default NewDogForm