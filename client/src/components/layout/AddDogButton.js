import React from "react";
import { Link } from "react-router-dom";

const AddDogButton = () => {
  return (
    <Link className="header-link" to="/dogs/new">
      Add your dog
    </Link>
  );
};
export default AddDogButton;
