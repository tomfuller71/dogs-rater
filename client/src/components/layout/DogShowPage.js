import React, { useState, useEffect } from "react";

import ReviewTile from "./ReviewTile";
import { withRouter, Redirect } from "react-router-dom";
import Fetcher from "./services/Fetcher.js";
import DogReviewForm from "./DogReviewForm";

const DogShowPage = (props) => {
  const { user } = props;
  const [reviewFormVisibility, setReviewFormVisibility] = useState(false);
  const [dog, setDog] = useState({
    dogName: "",
    userId: "",
    description: "",
    image: "",
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

  const deleteVote = async (reviewId) => {
    try {
      const response = await fetch(`/api/v1/dogs/${dogId}/reviews/votes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId }),
      });
      return true;
    } catch (error) {
      console.log(error);
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
    return true;
  };

  const updateReview = async (review, update) => {
    const index = dog.reviews.findIndex((element) => review.id === element.id);
    let newReview = {
      ...review,
      userVote: update.newUserVote,
    };

    if (update.removeExistingVote) {
      const previousVoteType = `${review.userVote}Votes`;
      newReview[previousVoteType] -= 1;
      await deleteVote(review.id);
    }

    if (update.postNewVote) {
      const newVoteType = `${update.newUserVote}Votes`;
      newReview[newVoteType] += 1;
      await postNewVote(update.newUserVote, review);
    }

    if (update.userVote === null) {
      delete newReview.userVote;
    }

    const updatedReviews = [...dog.reviews];
    updatedReviews.splice(index, 1, newReview);

    return setDog({ ...dog, reviews: updatedReviews });
  };

  const makeNewVote = async (newVote, review) => {
    if (!user) return setShouldRedirect(true);

    const existingVote = review?.userVote;

    let update = {
      postNewVote: false,
      removeExistingVote: false,
      newUserVote: newVote,
    };

    if (!existingVote) {
      update.postNewVote = true;
    } else if (newVote !== existingVote) {
      update.removeExistingVote = true;
      update.postNewVote = true;
    } else {
      update.removeExistingVote = true;
      update.newUserVote = null;
    }

    updateReview(review, update);
  };

  const postReview = async (review) => {
    const response = await Fetcher.post(`/api/v1/dogs/${dogId}/reviews`, review);

    if (!response.ok) {
      return setErrors(response.validationErrors);
    }

    const updatedReviews = [...dog.reviews, response.data.newReview];
    setDog({ ...dog, reviews: updatedReviews });
  };

  if (shouldRedirect) {
    return <Redirect push to="/user-sessions/new" />;
  }

  const reviewsList = dog.reviews.map((review) => {
    return <ReviewTile key={review.id} makeNewVote={makeNewVote} review={review} user={user} />;
  });

  let emptyReviews = null;
  if (!dog.reviews.length) {
    emptyReviews = (
      <div className="empty-reviews">
        <h3>It's heckin' empty. Be the first to write a review.</h3>
        <div className="button">Review {dog.dogName}</div>
      </div>
    );
  }

  let dogDescription = null;
  if (dog.description) {
    dogDescription = <p>{dog.description}</p>;
  }

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
          {reviewFormVisibility && (
            <DogReviewForm
              postReview={postReview}
              user={user}
              reviewClickHandler={reviewClickHandler}
            />
          )}
          <h4>{dog.rating}/10</h4>
        </div>

        <div className="cell small-12 large-7 reviews">
          {emptyReviews}
          <div className="overflow">{reviewsList}</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(DogShowPage);
