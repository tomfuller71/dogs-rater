import React from "react";

const ReviewTile = ({ userName, rating, description }) => {
  return (
    <div className="grid-x callout">
      <div className="cell small-9">
        <h3>{userName}</h3>
        <p>{description}</p>
      </div>
      <div className="cell small-3">
        <div className="dog-rating">{rating} / 10</div>
      </div>
    </div>
  );
};

export default ReviewTile;
