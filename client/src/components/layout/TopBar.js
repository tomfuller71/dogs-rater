import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import AddDogButton from "./AddDogButton.js";
import Logo from "../../assets/logo.svg";
import MobileLogo from "../../assets/mobile-logo.svg";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className="header-link">
        Sign in
      </Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="header-link">
        Sign up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="add-dog">
      <AddDogButton userId={user?.id} />
    </li>,
    <li key="profile">
      <Link to="/user-profile">Profile</Link>
    </li>,

    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="menu-container">
      <div className="header">
        <div className="header-left">
          <Link to="/">
            <img src={Logo} className="logo" alt="Pupperater" />
            <img src={MobileLogo} className="mobile-logo" alt="Pupperater" />
          </Link>
        </div>
        <div className="header-right">
          <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
