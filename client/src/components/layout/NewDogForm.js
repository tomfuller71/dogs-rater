import React, { useState } from "react"
import { Redirect } from "react-router-dom";

import Fetcher from "./services/Fetcher.js";
import ErrorList from "./ErrorList.js"

const NewDogForm = ({ user }) => {
  const defaultFormValue = {
    dogName: "",
    description: ""
  };

  const [newDog, setNewDog] = useState(defaultFormValue);
  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const getNewDog = async () => {
    const response = await Fetcher.post(`/api/v1/dogs`, newDog);
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

  if (shouldRedirect) {
    return <Redirect push to="/" />;
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewDogForm