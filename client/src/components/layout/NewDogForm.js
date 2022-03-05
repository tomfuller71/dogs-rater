import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Dropzone from "react-dropzone";

import translateServerErrors from "./services/translateServerErrors.js";
import ErrorList from "./ErrorList.js";

const NewDogForm = ({ user }) => {
  const defaultFormValue = {
    dogName: "",
    description: "",
    image: {},
  };

  const [newDog, setNewDog] = useState(defaultFormValue);
  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleImageUpload = (acceptedFiles) => {
    setFileName(acceptedFiles[0].name);
    setNewDog({
      ...newDog,
      image: acceptedFiles[0],
    });
  };

  const getNewDog = async (event) => {
    const userId = user.id;
    const newDogBody = new FormData();
    newDogBody.append("dogName", newDog.dogName);
    newDogBody.append("description", newDog.description);
    newDogBody.append("image", newDog.image);
    newDogBody.append("userId", userId);
    try {
      const response = await fetch("/api/v1/dogs", {
        method: "POST",
        headers: {
          Accept: "image/jpeg",
        },
        body: newDogBody,
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        } else {
          throw new Error(`${response.status} (${response.statusText})`);
        }
      }
      const body = await response.json();
      setShouldRedirect(true);
    } catch (error) {
      console.error(`Error in addDog Fetch: ${error.message}`);
    }
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
    <div className="form-background">
      <div className="form grid-container">
        <h1>Add a New Dog</h1>

        <ErrorList errors={errors} />

        <form onSubmit={handleSubmit}>
          <Dropzone onDrop={handleImageUpload}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div className="drop-zone" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag and drop your dog pic, or click to upload</p>
                </div>
              </section>
            )}
          </Dropzone>
          <h5 className="file-name">
            <strong>You've selected:</strong> {fileName}
          </h5>
          <label>
            Name:
            <input type="text" name="dogName" value={newDog.dogName} onChange={handleInputChange} />
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
            <input className="button" type="submit" value="Submit" />
            <input className="button clear" type="button" value="Clear Form" onClick={clearForm} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDogForm;
