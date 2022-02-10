import React, { useState, useEffect } from "react";

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

  const [shouldRedirect, setShouldRedirect] = useState(false);

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

  const deleteVote = async (voteId) => {
    try {
      const response = await fetch(`/api/v1/dogs/${dogId}/reviews/votes/${voteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return true
    } catch (error) {
      console.log(error)
    }
  };

  const postNewVote = async (userVote, review) => {
    const response = await Fetcher.post(`/api/v1/dogs/${dogId}/reviews/votes`, {
      userVote,
      reviewId: review.id,
    });

    if (!response.ok) {
      return setErrors(response.validationErrors);
    }
    return true
  }

  const updateReview = async (review, update) => {
    const index = dog.reviews.findIndex((element) => review.id === element.id)
    let newReview = {
      ...review,
      userVote: update.newUserVote
    }
    
    if (update.postNewVote) {
      const newVoteType = `${update.newUserVote}Votes`
      newReview[newVoteType] += 1
      await postNewVote(update.newUserVote, review)
    }

    if (update.removeExistingVote) {
      const previousVoteType = `${review.userVote}Votes`
      newReview[previousVoteType] -= 1
      await deleteVote(review.voteId);
    }

    if (update.userVote === null) {
      delete newReview.userVote
    }

    const updatedReviews = [...dog.reviews];
    updatedReviews.splice(index, 1, newReview);

    return setDog({ ...dog, reviews: updatedReviews });
  };

  const makeNewVote = async (newVote, review) => {
    if (!user) return setShouldRedirect(true);

    const existingVote = review?.userVote

    let update = { 
      postNewVote: false,
      removeExistingVote: false,
      newUserVote: newVote
    }

    if (!existingVote) {
      update.postNewVote = true
    } else if (newVote !== existingVote) {
      update.postNewVote = true
      update.removeExistingVote = true
    } else {
      update.removeExistingVote = true
      update.newUserVote = null
    }

    updateReview(review, update)
  };

  const postReview = async (review) => {
    const response = await Fetcher.post(`/api/v1/dogs/${dogId}/reviews`, review)

    if (!response.ok) {
      return setErrors(response.validationErrors);
    }

    const updatedReviews = [...dog.reviews, response.data.newReview];
    setDog({ ...dog, reviews: updatedReviews });
  }

  if (shouldRedirect) {
    return <Redirect push to="/user-sessions/new" />;
  }

  const reviewsList = dog.reviews.map((review) => {
    return (
      <ReviewTile key={review.id} makeNewVote={makeNewVote} review={review} />
    )
  })

  let dogDescription = "No description provided";
  if (dog.description) {
    dogDescription = <p>{dog.description}</p>;
  }

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
