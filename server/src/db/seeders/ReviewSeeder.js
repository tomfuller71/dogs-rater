import { Review } from "../../models/index.js";

class ReviewSeeder {
  static async seed() {
    const reviewData = [
      {
        rating: "10",
        description: "I have never seen a better dog. Seriously.",
        upvotes: 5,
        downvotes: 1,
        userId: 1,
        dogId: 2,
      },
      {
        rating: "9",
        description: "Wow.  What a dog!",
        upvotes: 3,
        downvotes: 2,
        userId: 3,
        dogId: 1,
      },
      {
        rating: "14",
        description:
          "I have been looking at pictures of dogs for over 30 years. This is the best-looking one yet.",
        upvotes: 5,
        downvotes: 1,
        userId: 2,
        dogId: 3,
      },
    ];
    for (const singleReviewData of reviewData) {
      const currentReview = await Review.query().findOne({ rating: singleReviewData.rating });
      if (!currentReview) {
        await Review.query().insert(singleReviewData);
      }
    }
  }
}

export default ReviewSeeder;
