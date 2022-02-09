import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";


const ReviewTile = ( { userName, rating, description, upVotes, downVotes, id, logVote, didVote } ) => {

  const upVoteHandler = (event) => {
    logVote('up', id)
  }

  const downVoteHandler = (event) => {
    logVote('down', id)
  }

  return (
    <div className="grid-x callout">
      <div className="cell small-9">
        <h3>{userName}</h3>
        <p>{description}</p>
        <span>
          <button onClick={upVoteHandler} class="green">
            <FontAwesomeIcon icon={faThumbsUp} className="icon"/>
          </button>
          {" "}{upVotes} 
          <button onClick={downVoteHandler}>
            <FontAwesomeIcon icon={faThumbsDown} className="icon"/>
          </button>
          {" "}{downVotes}
          </span>
          {didVote && <span> You Voted Already</span>}
      </div>
      <div className="cell small-3 dog-rating">{rating} / 10</div>
    </div>
  );
};

export default ReviewTile;
  