import React, { useState, useEffect } from "react";
import EditForm from "./EditForm";

const ReviewTile = ({ user, reviewerName, rating, description, reviewId }) => {
  let linkVisibility = false;
  if (user) {
    if (reviewerName === user.name) {
      linkVisibility = true;
    }
  }

  const [showEditForm, setShowEditForm] = useState(false);
  const [editedReview, setEditedReview] = useState({ description, rating });

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
      const response = await fetch(`/api/v1/users/${user.id}/${reviewId}`, {
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
    deleteReview(reviewId);
  };

  const handleInputChange = (event) => {
    setEditedReview({
      ...editedReview,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editReview(editedReview, reviewId);
    setShowEditForm(false);
  };

  return (
    <div className="grid-x review-tile">
      <div className="cell small-10">
        <h5>{reviewerName}</h5>
        <p>{description}</p>
        {linkVisibility && (
          <>
            <a onClick={editHandler}>Edit</a>
            <a onClick={deleteHandler}>Delete</a>
          </>
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
