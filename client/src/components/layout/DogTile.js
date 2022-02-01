import React from "react";

const DogTile = (props) => {
  console.log(props);
  return (
    <div className="dog cell card small-6 medium-4 large-3">
      <img src={props.pictureUrl} alt="Dog image" className="dog-image" />
      <div className="card-section orange">
        <div className="cell small-6">
          <h4>{props.name}</h4>
        </div>
        <div className="cell small-6">
          <h4>{props.rating}</h4>
        </div>
      </div>
    </div>
  );
};

export default DogTile;
