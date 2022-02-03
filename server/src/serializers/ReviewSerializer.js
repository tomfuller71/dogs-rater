import { Review } from "../models/index.js";

class ReviewsSerializer {
  static async getReviewDetail(review) {
    const user = await review.$relatedQuery("user");
    const allowedAttributes = ["rating", "description", "id"];

    let serializedReview = {};
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute];
    }

    serializedReview.userName = user.name;
    return serializedReview;
  }

  static async getReviewsDetails(reviews) {
    return Promise.all(
      reviews.map((review) => {
        return this.getReviewDetail(review);
      })
    );
  }
}

export default ReviewsSerializer;
