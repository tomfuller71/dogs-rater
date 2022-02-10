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

  const updateVotes = (userVote, review, deleting) => {
    const index = dog.reviews.findIndex((element) => review.id === element.id);
    const voteType = `${userVote}Votes`;
    let newReview = {
      ...review,
      userVote,
      [voteType]: (review[voteType] += 1),
    };

    if (deleting) {
      const previousVoteType = `${review.userVote}Votes`
      newReview[previousVoteType] -= 1
    }

    const updatedReviews = [...dog.reviews];
    updatedReviews.splice(index, 1, newReview);

    return setDog({ ...dog, reviews: updatedReviews });
  };

  // const updateVoteStatus = (userVote, reviewId) => {
  //   const index = dog.reviews.findIndex(review => review.id === reviewId)
  //   const currentReview = dog.reviews[index]
  //   const updatedReviews = [...dog.reviews]
  //   updatedReviews.splice(index, 1, newReview)

  //   return setDog({...dog, reviews: updatedReviews})
  // }

  // const unVote = async (voteId) => {
  //
  // }

  /*
  If user not previously voted and click up 
  return = { userVote: up, upvotes: +1 }

  If user not previously voted and click up 
  return = { userVote: up, upvotes: +1 }

  User already voted up - then click on up
  return = {userVote: null, upVotes: -1}

  User already voted up - then they click down
  return = { userVote: down, upvotes: -1, downVotes: +1}

  User already voted down - then click on down
  return = {userVote: null, downVotes: -1}

  User already voted down - then they click up
  return = { userVote: up, upvotes: +1, downVotes: -1}
  
*/

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

  const postNewVote = async (newVote, review) => {
    const response = await Fetcher.post(`/api/v1/dogs/${dogId}/reviews/votes`, {
      newVote,
      reviewId: review.id,
    });

    if (!response.ok) {
      return setErrors(response.validationErrors);
    }
    return true
  }

  const logVote = async (newVote, review) => {
    if (!user) return setShouldRedirect(true);

    const existingVote = review?.userVote
    let post = false, remove = false
    if (!existingVote) {
      post = true
    } else if (newVote !== existingVote) {
      post = true
      remove = true
    } else {
      remove = true
    }

    if(post && remove){
      await deleteVote(review.id)
      await postNewVote(newVote, review)
    } else if(post){
      await postNewVote(newVote, review)
    } else {
      await deleteVote(review.id)
    }
    // await deleteVote(review.id)
    // await postNewVote(newVote, review)
    // updateVotes(newVote, review, false)
    // updateVotes(newVote, review, true)
};

  if (shouldRedirect) {
    return <Redirect push to="/user-sessions/new" />;
  }

  const reviewsList = dog.reviews.map((review) => {
    return <ReviewTile key={review.id} logVote={logVote} review={review} />;
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
