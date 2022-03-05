import React, { useState } from "react";

const DogReviewForm = (props) => {
  const [newReview, setNewReview] = useState({
    description: "",
    rating: "",
  });

  const handleInputChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.postReview(newReview);
    setNewReview({
      description: "",
      rating: "",
    });
  };

  return (
    <div className="review-form-container">
      <form className="review-form" onSubmit={handleSubmit}>
        <label>
          Add new review
          <textarea name="description" onChange={handleInputChange} value={newReview.description} />
        </label>

        <label className="rating-label">
          Rating
          <select name="rating" value={newReview.rating} onChange={handleInputChange}>
            <option value="" disabled>
              Pick a number
            </option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
          </select>
        </label>

        <div className="button-group">
          <input className="review button" type="submit" value="Submit" />
          <div className="cancel button" onClick={props.reviewClickHandler}>
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
};

export default DogReviewForm;
