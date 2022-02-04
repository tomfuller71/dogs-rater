import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import AddDogButton from "./AddDogButton.js";
import Logo from "../../assets/logo.svg";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="add-dog">
      <AddDogButton userId={user?.id} />
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="menu-container">
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="logo">
              <Link to="/">
                <img src={Logo} className="logo" alt="Pupperater" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
