import React, { useEffect, useState } from "react";
import Fetcher from "./services/Fetcher";
import { Link } from "react-router-dom";

import MyReviewTile from "./MyReviewTile";
import DogTile from "./DogTile";

const UserProfile = (props) => {
  const userId = props.user.id;

  const [user, setUser] = useState({
    name: "",
    email: "",
    dogs: [],
    reviews: [],
  });

  const getUserData = async () => {
    const response = await Fetcher.get(`/api/v1/users/${userId}`);
    if (response.ok) {
      return setUser(response.data.user);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const dogs = user.dogs.map((dog) => {
    return <DogTile key={dog.id} dog={dog} />;
  });

  const reviews = user.reviews.map((review) => {
    return <MyReviewTile key={review.id} review={review} />;
  });

  return (
    <div className="grid-x grid-margin-x align-center">
      <div className="cell small-10">
        <h1>User Profile</h1>
        <div className="callout">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>

      <div className="cell callout small-5">
        <h2>My Dogs</h2>
        <ul>{dogs}</ul>
      </div>

      <div className="cell callout small-5">
        <h2>My Reviews</h2>
        <ul>{reviews}</ul>
      </div>
    </div>
  );
};

export default UserProfile;