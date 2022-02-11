import React, { useState, useEffect } from "react";
import EditForm from "./EditForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const ReviewTile = ({ review, makeNewVote, user }) => {
  const { rating, description, upVotes, downVotes, userVote, reviewId, userId } = review;

  const linkVisibility = user?.id === userId;

  const [showEditForm, setShowEditForm] = useState(false);
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
    } catch (error) {
      console.log(`Error in fetch: ${error.message}`);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/v1/users/${userId}/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setUser(body.data);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
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
        <h5>{review.userName}</h5>
        <p>{description}</p>
        <div className="vote-block">
          <div className="upvotes">
            <FontAwesomeIcon
              onClick={upVoteHandler}
              icon={faThumbsUp}
              className={`icon ${thumbUpColor}`}
            />
            {upVotes}
          </div>
          <div className="downvoteS">
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
        <h3>{rating}/10</h3>
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
