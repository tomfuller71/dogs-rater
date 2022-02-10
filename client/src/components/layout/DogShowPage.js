import React, { useState, useEffect } from "react";
import Link from "react-dom";
import ReviewTile from "./ReviewTile";
import { withRouter } from "react-router-dom";
import Fetcher from "./services/Fetcher.js";
import DogReviewForm from "./DogReviewForm";

const DogShowPage = (props) => {
  const { user } = props;
  const [reviewFormVisibility, setReviewFormVisibility] = useState(false);
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
        reviewerName={review.userName}
        description={review.description}
        rating={review.rating}
        reviewId={review.id}
        user={user}
      />
    );
  });

  let dogDescription = null;
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

  const reviewClickHandler = (event) => {
    event.preventDefault();
    setReviewFormVisibility(!reviewFormVisibility);
  };

  return (
    <div className="grid-container fixed">
      <h1>{dog.dogName}</h1>
      {dogDescription}
      <a className="show-review" onClick={reviewClickHandler}>
        Review {dog.dogName}
      </a>
      <div className="grid-x grid-margin-x fullheight">
        <div
          className="cell small-12 large-5 dog-pic"
          style={{
            backgroundImage: `url(${dog.image} )`,
          }}
        >
          {reviewFormVisibility && <DogReviewForm postReview={postReview} user={user} />}
          <h4>{dog.rating}/10</h4>
        </div>

        <div className="cell small-12 large-7 reviews">
          <div className="overflow">{reviewsList}</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(DogShowPage);
