import { Review } from "../../models/index.js";

class ReviewSeeder {
  static async seed() {
    const reviewData = [
      {
        rating: 10,
        description: "I have never seen a better dog. Seriously.",
        userId: 1,
        dogId: 2,
      },
      {
        rating: 9,
        description: "Wow.  What a dog!",
        userId: 3,
        dogId: 1,
      },
      {
        rating: 14,
        description:
          "I have been looking at pictures of dogs for over 30 years. This is the best-looking one yet.",
        userId: 2,
        dogId: 3,
      },
      {
        rating: 13,
        description: "This is a fairly average dog. Not impressed.",
        userId: 1,
        dogId: 2,
      },
      {
        rating: 11,
        description: "Wow. Much bark. So floof.",
        userId: 3,
        dogId: 2,
      },
      {
        rating: 15,
        description: "This is the dog I've been waiting for.",
        userId: 2,
        dogId: 2,
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
