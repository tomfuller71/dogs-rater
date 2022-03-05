import React, { useState, useEffect } from "react";
import { Switch, Link, Route } from "react-router-dom";
import DogTile from "./DogTile";

const DogsList = (props) => {
  const [dogs, setDogs] = useState([]);
  const [currentView, setCurrentView] = useState("date");

  const sortByDate = (dogArray) => {
    return dogArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const sortByRating = (dogArray) => {
    return dogArray.sort((a, b) => b.rating - a.rating);
  };

  const getDogs = async () => {
    try {
      const response = await fetch(`/api/v1/dogs`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const dogData = await response.json();
      setDogs(sortByDate(dogData.dogs));
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getDogs();
  }, []);

  const dateClick = (event) => {
    const newDogArray = [...dogs];
    setDogs(sortByDate(newDogArray));
    return setCurrentView("date");
  };

  const ratingClick = (event) => {
    const newDogArray = [...dogs];
    setDogs(sortByRating(newDogArray));
    return setCurrentView("rating");
  };

  const dogTiles = dogs.map((dog) => {
    return <DogTile key={dog.id} dog={dog} />;
  });

  return (
    <div className="grid-container index-page">
      <h1>Welcome to Pupperater</h1>
      <h4 className="subhead">
        Your definitive source for America's top doggos, inspired by the{" "}
        <a href="https://twitter.com/dog_rates" target="_blank">
          best account on Twitter
        </a>
        .
      </h4>
      <div className="sort-links">
        <strong>Sort by:</strong>
        <a className={currentView === "date" ? "active" : "inactive"} onClick={dateClick}>
          Newest
        </a>
        <a className={currentView === "rating" ? "active" : "inactive"} onClick={ratingClick}>
          Heckin' best
        </a>
      </div>
      <div className="grid-x grid-margin-x">{dogTiles}</div>
    </div>
  );
};

export default DogsList;
