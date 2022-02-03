import React, { useState, useEffect } from "react";
import Link from "react-dom";

import DogReviewForm from "./DogReviewForm";
import Fetcher from "./services/Fetcher.js";

const DogShowPage = (props) => {
  const [dog, setDog] = useState({});
  const [reviews, setReviews] = useState([]);
  const { user } = props;
  const dogId = props.match.params.id;
  const getDog = async () => {
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

  const postReview = async (review) => {
    const response = await Fetcher.post(`/api/v1/dogs/${dogId}`, review);
    if (!response.ok) {
      return setErrors(response.validationErrors);
    }
    const updatedReviews = [...reviews, response.data];
    setReviews(updatedReviews);
  };
  return (
    <div className="grid-container">
      <h1>{dog.dogName}</h1>
      <div className="grid-x grid-margin-x grid-padding-x">
        <div className="cell small-12 large-6">
          <p>{dog.description}</p>
          <img src={dog.pictureUrl} alt="Dog image" className="dog-image" />
          <DogReviewForm postReview={postReview} user={user} />
        </div>
        <div className="cell small-12 large-6"></div>
      </div>
    </div>
  );
};

export default DogShowPage;
