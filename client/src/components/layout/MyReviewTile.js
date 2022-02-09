import React, { useState } from "react";
import { Link } from "react-router-dom";

const MyReviewTile = (props) => {
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
    <div className="grid-x callout review-tile">
      <div className="cell small-9">
        <Link to={`/dogs/${dogId}`}>
          <h3>{dogName}</h3>
        </Link>
        <p>{description}</p>
      </div>
      <div className="cell small-3 dog-rating">{rating} / 10</div>
      <a onClick={editHandler}>Edit</a>
      <a onClick={deleteHandler}>Delete</a>
      {showEditForm && (
        <form onSubmit={handleSubmit}>
          <label>
            Edit review
            <input
              type="text"
              name="description"
              onChange={handleInputChange}
              value={editedReview.description}
            />
          </label>
          <label>
            Rating
            <input
              type="number"
              name="rating"
              onChange={handleInputChange}
              value={editedReview.rating}
            />
          </label>
          <input className="button" type="submit" value="Submit" />
          <button onClick={cancelHandler}>cancel</button>
        </form>
      )}
    </div>
  );
};

export default MyReviewTile;
