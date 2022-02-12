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

  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/v1/users/${userId}/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setUser(body.data);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const editReview = async (editedReview, id) => {
    try {
      const response = await fetch(`/api/v1/users/${userId}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedReview),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setUser(body.data);
    } catch (error) {
      console.log(`Error in fetch: ${error.message}`);
    }
  };

  const dogs = user.dogs.map((dog) => {
    return <DogTile key={dog.id} dog={dog} />;
  });

  const reviews = user.reviews.map((review) => {
    return (
      <MyReviewTile
        key={review.id}
        review={review}
        deleteReview={deleteReview}
        editReview={editReview}
      />
    );
  });

  return (
    <div className="grid-container profile">
      <div className="grid-x grid-margin-x my-stuff">
        <div className="cell small-12">
          <h1>My profile</h1>

          <p className="user-info">
            <strong>Name:</strong> {user.name}
            <br />
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        <div className="cell small-12 large-5">
          <h3>My dogs</h3>
          <ul className="profile-column">{dogs}</ul>
        </div>

        <div className="cell small-12 large-7 overflow">
          <h3>My reviews</h3>
          <ul className="profile-column">{reviews}</ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
