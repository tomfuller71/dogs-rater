import { User } from "../models/index.js";
import DogSerializer from "./DogSerializer.js";
import ReviewsSerializer from "./ReviewSerializer.js";

class UserSerializer {
  static async getUserDetail(user) {
    const allowedAttributes = ["name", "email", "id"];

    let serializedUser = {};
    for (const attribute of allowedAttributes) {
      serializedUser[attribute] = user[attribute];
    }

    const dogs = await user.$relatedQuery("dogs")
    serializedUser.dogs = await DogSerializer.getDogCollectionDetails(dogs)

    const reviews = await user.$relatedQuery("reviews")

    serializedUser.reviews = await ReviewsSerializer
    .getReviewCollectionDetails(reviews)

    return serializedUser;
  }
}

export default UserSerializer;