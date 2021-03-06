import React, { useState, useEffect } from "react";
import { Switch, Link, Route } from "react-router-dom";
import DogTile from "./DogTile";

const DogsList = (props) => {
  const [dogs, setDogs] = useState([]);

  const getDogs = async () => {
    try {
      const response = await fetch(`/api/v1/dogs`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const dogData = await response.json();
      setDogs(dogData.dogs);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getDogs();
  }, []);

  const dogTiles = dogs.map((dog) => {
    return <DogTile key={dog.id} dog={dog} />;
  });

  return (
    <div className="grid-container index-page">
      <h1>America's Top Doggos</h1>
      <h4 className="subhead">Your definitive source for good gurls and bois</h4>
      <div className="grid-x grid-margin-x">{dogTiles}</div>
    </div>
  );
};

export default DogsList;
