import { Review, User } from "../models/index.js";

const getReviewDetail = async (review) => {
  const user = await review.$relatedQuery("user");
  const allowedAttributes = ["rating", "description", "id"];
  let serializedReview = {};
  for (const attribute of allowedAttributes) {
    serializedReview[attribute] = review[attribute];
  }
  serializedReview.userName = user.name;
  return serializedReview;
};

const getReviewsDetails = async (reviews) => {
  return Promise.all(
    reviews.map((review) => {
      return getReviewDetail(review);
    })
  );
};

export default getReviewsDetails;
