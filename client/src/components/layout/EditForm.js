import React from "react";

const EditForm = ({ editedReview, handleInputChange, handleSubmit }) => {
  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <label className="description-label">
        Description
        <input
          name="description"
          type="text"
          value={editedReview.description}
          onChange={handleInputChange}
        ></input>
      </label>
      <label className="rating-label">
        Rating
        <select name="rating" value={editedReview.rating} onChange={handleInputChange}>
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
      <input type="submit" value="Save changes" className="button"></input>
    </form>
  );
};

export default EditForm;
