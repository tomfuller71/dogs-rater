import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditForm from "./EditForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const MyReviewTile = (props) => {
  const { upVotes, downVotes } = props.review;

  const { review, deleteReview, editReview } = props;
  const { rating, description, dogName, dogId, id } = review;
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedReview, setEditedReview] = useState({ description, rating });

  const deleteHandler = (event) => {
    event.preventDefault();
    deleteReview(id);
  };

  const editHandler = (event) => {
    event.preventDefault();
    setShowEditForm(!showEditForm);
  };

  const handleInputChange = (event) => {
    setEditedReview({
      ...editedReview,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editReview(editedReview, id);
    setShowEditForm(false);
  };

  const cancelHandler = (event) => {
    setShowEditForm(false);
  };

  return (
    <div className="grid-x review-tile">
      <div className="cell small-10">
        <h5>{dogName}</h5>
        <p>{description}</p>
        <div className="profile vote-block">
          <div className="upvotes">
            <FontAwesomeIcon icon={faThumbsUp} className="icon" />
            {upVotes}
          </div>
          <div className="downvotes">
            <FontAwesomeIcon icon={faThumbsDown} className="icon" />
            {downVotes}
          </div>
        </div>

        <div className="edit-links">
          <a onClick={editHandler}>Edit</a>
          <a onClick={deleteHandler}>Delete</a>
        </div>
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

export default MyReviewTile;
