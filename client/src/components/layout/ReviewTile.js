import React from "react";


const ReviewTile = ({ userName, rating, description, upVotes, downVotes }) => {

  const upVoteIcon = <i id="upVote" className="fa-solid fa-thumbs-up"></i>
  const downVoteIcon = <i id="downVote" className="fa-solid fa-thumbs-down"></i>

  return (
    <div className="grid-x callout">
      <div className="cell small-9">
        <h3>{userName}</h3>
        <p>{description}</p>
        <p>{upVoteIcon} {upVotes} {downVoteIcon} {downVotes}</p>
      </div>
      <div className="cell small-3 dog-rating">{rating} / 10</div>
    </div>
  );
};

export default ReviewTile;
