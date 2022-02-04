import { Review, User, Dog } from "../../models/index.js";

class ReviewSeeder {
  static async seed() {

    const francis = await User.query().findOne("name", "Francis")
    const bob = await User.query().findOne("name", "Bob")
    const sara = await User.query().findOne("name", "Sara")

    const penny = await Dog.query().findOne("dogName", "Penny")
    const steve = await Dog.query().findOne("dogName", "Steve")
    const frankie = await Dog.query().findOne("dogName", "Frankie")
    
    const reviewData = [
      {
        rating: 10,
        description: "I have never seen a better dog. Seriously.",
        userId: francis.id,
        dogId: penny.id,
      },
      {
        rating: 9,
        description: "Wow.  What a dog!",
        userId: bob.id,
        dogId: steve.id,
      },
      {
        rating: 14,
        description:
          "I have been looking at pictures of dogs for over 30 years. This is the best-looking one yet.",
        userId: sara.id,
        dogId: frankie.id,
      },
      {
        rating: 13,
        description: "This is a fairly average dog. Not impressed.",
        userId: francis.id,
        dogId: penny.id,
      },
      {
        rating: 11,
        description: "Wow. Much bark. So floof.",
        userId: sara.id,
        dogId: penny.id,
      },
      {
        rating: 15,
        description: "This is the dog I've been waiting for.",
        userId: bob.id,
        dogId: penny.id,
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
