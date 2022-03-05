import React, { useEffect, useState } from "react";
import Fetcher from "./services/Fetcher";
import { Link, Route, useLocation } from "react-router-dom";

import MyReviewTile from "./MyReviewTile";
import MyDogTile from "./MyDogTile";

const UserProfile = (props) => {
  const userId = props.user.id;

  const [currentView, setCurrentView] = useState("reviews");
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

  const reviewClickHandler = (event) => {
    setCurrentView("reviews");
  };
  const dogClickHandler = (event) => {
    setCurrentView("dogs");
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
    return <MyDogTile key={dog.id} dog={dog} />;
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
      <h1>My profile</h1>
      <div className="grid-x grid-margin-x my-stuff">
        <div className="cell small-12 medium-8 large-9">
          <div className="view-links">
            <a
              className={currentView === "reviews" ? "active" : "inactive"}
              onClick={reviewClickHandler}
            >
              My reviews
            </a>
            <a className={currentView === "dogs" ? "active" : "inactive"} onClick={dogClickHandler}>
              My dogs
            </a>
          </div>
          {currentView === "reviews" ? (
            <div className="profile-column overflow cell small-12">{reviews}</div>
          ) : (
            <div className="profile-column overflow grid-x grid-margin-x">{dogs}</div>
          )}
        </div>
        <div className="cell small-12 medium-4 large-3 user-info">
          <h3>My info</h3>
          <p>
            <strong>Name:</strong> {user.name}
            <br />
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
