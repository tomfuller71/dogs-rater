import { Dog } from "../models/index.js"
import ReviewsSerializer from "./ReviewSerializer.js"

class DogSerializer {
  static async getDogDetail(dog, userId) {
    const allowedAttributes = ["id", "dogName", "description", "image", "createdAt"]

    let serializedDog = {}
    for (const attribute of allowedAttributes) {
      serializedDog[attribute] = dog[attribute]
    }

    const reviews = await dog.$relatedQuery("reviews")
    const serializedReviews = await ReviewsSerializer.getReviewCollectionDetails(reviews, userId)

    serializedDog.reviews = serializedReviews
    serializedDog.rating = this.averageRating(reviews)

    return serializedDog
  }

  static async getDogCollectionDetails(dogs) {
    return Promise.all(
      dogs.map((dog) => {
        return this.getDogDetail(dog)
      })
    )
  }

  static averageRating(reviews) {
    if (reviews.length === 0) return null

    let total = 0

    reviews.forEach((review) => {
      total += review.rating
    })

    return (total / reviews.length).toFixed(1)
  }
}

export default DogSerializer
