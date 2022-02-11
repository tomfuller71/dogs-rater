import React, { useState, useEffect } from "react";
import EditForm from "./EditForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const ReviewTile = ({ review, makeNewVote, user, deleteReview }) => {
  const { rating, description, upVotes, downVotes, userVote, userId, userName } = review;

  const linkVisibility = user?.id === userId;

  const [showEditForm, setShowEditForm] = useState(false);
  const [reviewData, setReviewData] = useState({ description, rating })
  const [editedReview, setEditedReview] = useState({ description, rating });

  let thumbUpColor = userVote === "up" ? "orange" : "grey";
  let thumbDownColor = userVote === "down" ? "orange" : "grey";

  const editReview = async (editedReview, reviewId) => {
    try {
      const response = await fetch(`/api/v1/users/${user.id}/${reviewId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedReview),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      console.log(editedReview)

    } catch (error) {
      console.log(`Error in fetch: ${error.message}`);
    }
  };
  
  const editHandler = (event) => {
    event.preventDefault();
    setShowEditForm(!showEditForm);
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    deleteReview(review.id);
  };

  const handleInputChange = (event) => {
    setEditedReview({
      ...editedReview,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editReview(editedReview, review.id);
    setReviewData(editedReview)
    setShowEditForm(false);
  };

  const upVoteHandler = (event) => {
    makeNewVote("up", review);
  };

  const downVoteHandler = (event) => {
    makeNewVote("down", review);
  };

  return (
    <div className="grid-x review-tile">
      <div className="cell small-10">
        <h5>{userName}</h5>
        <p>{reviewData.description}</p>
        <div className="vote-block">
          <div className="upvotes">
            <FontAwesomeIcon
              onClick={upVoteHandler}
              icon={faThumbsUp}
              className={`icon ${thumbUpColor}`}
            />
            {upVotes}
          </div>
          <div className="downvotes">
            <FontAwesomeIcon
              onClick={downVoteHandler}
              icon={faThumbsDown}
              className={`icon ${thumbDownColor}`}
            />
            {downVotes}
          </div>
        </div>
        {linkVisibility && (
          <div className="edit-links">
            <a onClick={editHandler}>Edit</a>
            <a onClick={deleteHandler}>Delete</a>
          </div>
        )}
      </div>
      <div className="cell small-2 dog-rating">
        <h3>{reviewData.rating}/10</h3>
      </div>

      {showEditForm && (
        <EditForm
          editedReview={editedReview}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ReviewTile;
