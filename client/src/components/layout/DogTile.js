import React from "react";
import { Switch, Link, Route } from "react-router-dom";

const DogTile = (props) => {
  return (
    <div className="dog cell card small-6 medium-4 large-3">
      <Link to={`/dogs/${props.id}`}>
      <img src={props.pictureUrl} alt="Dog image" className="dog-image" />
      <div className="card-section orange">
        <div className="cell small-6">
          <h4>{props.name}</h4>
        </div>
        <div className="cell small-6">
          <h4>{props.rating}</h4>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default DogTile;
