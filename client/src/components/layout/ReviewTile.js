import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";


const ReviewTile = ( { review, makeNewVote } ) => {

  const { 
    userName,
    rating,
    description,
    upVotes,
    downVotes,
    userVote
  } = review

  let thumbUpColor = (userVote === "up") ? "orange" : "grey"
  let thumbDownColor = (userVote === "down") ? "orange" : "grey"

  const upVoteHandler = (event) => {
    makeNewVote('up', review)
  }

  const downVoteHandler = (event) => {
    makeNewVote('down', review)
  }

  return (
    <div className="grid-x callout">
      <div className="cell small-9">
        <h3>{userName}</h3>
        <p>{description}</p>
        <span>
          <button onClick={upVoteHandler} className={thumbUpColor}>
            <FontAwesomeIcon icon={faThumbsUp} className="icon"/>
          </button>
          {" "}{upVotes} 
          <button onClick={downVoteHandler} className={thumbDownColor}>
            <FontAwesomeIcon icon={faThumbsDown} className="icon"/>
          </button>
          {" "}{downVotes}
          </span>
      </div>
      <div className="cell small-3 dog-rating">{rating} / 10</div>
    </div>
  );
};

export default ReviewTile;
  