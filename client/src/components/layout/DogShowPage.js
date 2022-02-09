import React, { useState, useEffect } from "react";
import Link from "react-dom";
import ReviewTile from "./ReviewTile";
import { withRouter, Redirect } from "react-router-dom";
import Fetcher from "./services/Fetcher.js";
import DogReviewForm from "./DogReviewForm";

const DogShowPage = (props) => {
  const { user } = props;

  const [dog, setDog] = useState({
    dogName: "",
    userId: "",
    description: "",
    pictureUrl: "",
    reviews: [],
  });

  const [shouldRedirect, setShouldRedirect] = useState(false)

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

  const updateVotes = (userVote, reviewId) => {
    const index = dog.reviews.findIndex(review => review.id === reviewId)
    const currentReview = dog.reviews[index]
    const voteType = `${userVote}Votes`
    const newReview = {
      ...currentReview,
       [voteType]: (currentReview[voteType] += 1)
    }

    const updatedReviews = [...dog.reviews]
    updatedReviews.splice(index, 1, newReview)

    return setDog({...dog, reviews: updatedReviews})
  }

  const updateVoteStatus = (userVote, reviewId) => {
    const index = dog.reviews.findIndex(review => review.id === reviewId)
    const currentReview = dog.reviews[index]
    const propName = "didVote"
    const newReview = {
      ...currentReview,
       [propName]: true
    }

    const updatedReviews = [...dog.reviews]
    updatedReviews.splice(index, 1, newReview)

    return setDog({...dog, reviews: updatedReviews})
  }

  const logVote = async (userVote, reviewId) => {
    const response = await Fetcher.post(
      `/api/v1/dogs/${dogId}/reviews/votes`,
       {userVote, reviewId}
    )

    if (!response.ok) {
      return setErrors(response.validationErrors);
    }

    switch (response.data.message) {
      case "Log in required":
        return setShouldRedirect(true)
      case "Already voted": 
        return updateVoteStatus(userVote, reviewId)
      case "Vote logged":
        return updateVotes(userVote, reviewId)
      default:
        break;
    }
  }

  if(shouldRedirect){
    return <Redirect push to="/user-sessions/new" />;
  }

  const reviewsList = dog.reviews.map((review) => {
    return (
      <ReviewTile
        key={review.id}
        logVote={logVote}
        {...review}
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
          <h4>Rating: {dog.rating}</h4>
        </div>
        <div className="cell small-12 large-6">{reviewsList}</div>
        <DogReviewForm postReview={postReview} user={user} />
      </div>
    </div>
  );
};

export default withRouter(DogShowPage);
