import React, { useState, useEffect } from "react";
import Link from "react-dom";
import ReviewTile from "./ReviewTile";
import Fetcher from "./services/Fetcher.js";

const DogShowPage = (props) => {
  const [dog, setDog] = useState({
    dogName: "",
    userId: "",
    description: "",
    pictureUrl: "",
    reviews: [],
  });
  const dogId = props.match.params.id;

  const getDog = async () => {
    const response = await Fetcher.get(`/api/v1/dogs/${dogId}`);
    if (response.ok) {
      setDog(response.data.dog);
    } 
  };

  useEffect(() => {
    getDog();
  }, []);

  const reviewsList = dog.reviews.map((review) => {
    return (
      <ReviewTile
        key={review.id}
        userName={review.userName}
        description={review.description}
        rating={review.rating}
      />
    );
  });

  let dogDescription = "No description provided";
  if (dog.description) {
    dogDescription = <p>{dog.description}</p>;
  }

  return (
    <div className="grid-container">
      <h1>{dog.dogName}</h1>
      <div className="grid-x grid-margin-x grid-padding-x">
        <div className="cell small-12 large-6 fixed-container">
          {dogDescription}
          <img src={dog.pictureUrl} alt="Dog image" className="dog-image" />
        </div>
        <div className="cell small-12 large-6">{reviewsList}</div>
      </div>
    </div>
  );
};

export default DogShowPage;
