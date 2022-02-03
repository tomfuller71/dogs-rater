import React, { useState, useEffect } from "react";
import Link from "react-dom";

const DogShowPage = (props) => {
  const [dog, setDog] = useState({});
  const getDog = async () => {
    const dogId = props.match.params.id;
    try {
      const response = await fetch(`/api/v1/dogs/${dogId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setDog(body.dog);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDog();
  }, []);
  return (
    <div className="grid-container">
            <h1>{dog.dogName}</h1>
      <div className="grid-x grid-margin-x grid-padding-x">
        <div className="cell small-12 large-6">
          <p>{dog.description}</p>
          <img src={dog.pictureUrl} alt="Dog image" className="dog-image" />
        </div>
        <div className="cell small-12 large-6">
            <p>Reviews sadasdfasdfasdf</p>
        </div>
      </div>
    </div>
  );
};

export default DogShowPage;
