import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Fetcher from "./services/Fetcher.js";
import ErrorList from "./ErrorList.js";

const NewDogForm = ({ user }) => {
  const defaultFormValue = {
    dogName: "",
    description: "",
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
    <div className="form-container">
      <h1>Add a New Dog</h1>

      <ErrorList errors={errors} />
      <form className="new-dog-form" onSubmit={handleSubmit}>
        <label>
          Your dog's name:
          <input type="text" name="dogName" value={newDog.dogName} onChange={handleInputChange} />
        </label>
        <label>
          Description (optional):
          <textarea
            type="text"
            name="description"
            onChange={handleInputChange}
            value={newDog.description}
            rows="3"
          />
        </label>
        <div className="button-group">
          <input className="submit button" type="submit" value="Submit" />
          <input className="clear button" type="button" value="Clear Form" onClick={clearForm} />
        </div>
      </form>
    </div>
  );
};

export default NewDogForm;
