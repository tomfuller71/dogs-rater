import React, { useState, useEffect } from "react";
import Link from "react-dom";
import ReviewTile from "./ReviewTile";
import { withRouter } from "react-router-dom";
import Fetcher from "./services/Fetcher.js";
import DogReviewForm from "./DogReviewForm";

const DogShowPage = (props) => {
  const [dog, setDog] = useState({
    dogName: "",
    userId: "",
    description: "",
    pictureUrl: "",
    reviews: [],
  });
  const dogId = props.match.params.id;

  const getDog = async () => {
    const response = await Fetcher.get(`/api/v1/dogs/${dogId}`);
    if (response.ok) {
      setDog(response.data.dog);
    }
  };

  useEffect(() => {
    getDog();
  }, []);

  const reviewsList = dog.reviews.map((review) => {
    return (
      <ReviewTile
        key={review.id}
        userName={review.userName}
        description={review.description}
        rating={review.rating}
      />
    );
  });

  let dogDescription = "No description provided";
  if (dog.description) {
    dogDescription = <p>{dog.description}</p>;
  }
  const postReview = async (review) => {
    const response = await Fetcher.post(`/api/v1/dogs/${dogId}/reviews`, review);
    if (!response.ok) {
      return setErrors(response.validationErrors);
    }
    const updatedReviews = [...dog.reviews, response.data.newReview];
    setDog({ ...dog, reviews: updatedReviews });
  };

  return (
    <div className="grid-container">
      <h1>{dog.dogName}</h1>
      {dogDescription}
      <div className="grid-x grid-margin-x grid-padding-x">
        <div className="cell small-12 large-6 fixed-container">
          <img src={dog.pictureUrl} alt="Dog image" className="dog-image" />
        </div>
        <div className="cell small-12 large-6">{reviewsList}</div>
        <DogReviewForm postReview={postReview} user={user} />
      </div>
    </div>
  );
};

export default withRouter(DogShowPage);
