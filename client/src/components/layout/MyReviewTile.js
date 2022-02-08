import React from "react";
import { Link } from "react-router-dom";

const MyReviewTile = ({ review }) => {
  const { rating, description, dogName, dogId } = review
  return (
    <div className="grid-x callout">
      <div className="cell small-9">
        <Link to={`/dogs/${dogId}`}>
          <h3>{dogName}</h3>
        </Link>
        <p>{description}</p>
      </div>
      <div className="cell small-3 dog-rating">{rating} / 10</div>
    </div>
  );
};

export default MyReviewTile;
