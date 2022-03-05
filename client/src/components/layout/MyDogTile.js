import React from "react";
import { Link } from "react-router-dom";

const MyDogTile = ({ dog }) => {
  const { id, image, dogName, rating, reviews } = dog;

  let reviewCount = "reviews";
  if (reviews.length === 1) {
    reviewCount = " review";
  }

  return (
    <div className="dog cell card small-12 large-6">
      <Link to={`/dogs/${id}`}>
        <div
          className="card-top"
          style={{
            backgroundImage: `url(${image} )`,
          }}
        >
          {rating && <h4 className="rating"> {rating} / 10</h4>}
        </div>
        <div className="card-section orange grid-x">
          <div className="dog-name cell small-6">
            <h4>{dogName}</h4>
          </div>
          <div className="review-count cell small-6">
            <p className="reviewCount">
              {reviews.length} &nbsp;{reviewCount}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MyDogTile;
