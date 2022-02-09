import React from "react";
import { Link } from "react-router-dom";

const DogTile = ({ dog }) => {
  const { id, pictureUrl, dogName, rating} = dog
  
  return (
    <div className="dog cell card small-6 medium-4 large-3">
      <Link to={`/dogs/${id}`}>
      <img src={pictureUrl} alt="Dog image" className="dog-image" />
      <div className="card-section orange">
        <div className="cell small-6 dog-tile-bottom">
            <h4>{dogName}</h4>
            {rating && (
              <h4> {rating} / 10</h4>
            )}
        </div>
      </div>
      </Link>
    </div>
  );
};

export default DogTile;
