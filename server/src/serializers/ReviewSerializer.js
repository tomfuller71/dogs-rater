import { Review } from "../models/index.js"

class ReviewsSerializer {
  static async getReviewDetail(review) {
    const user = await review.$relatedQuery("user")
    const allowedAttributes = ["rating", "description", "id"]
    let serializedReview = {}
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }

    const dog = await review.$relatedQuery("dog")
    serializedReview.userName = user.name
    serializedReview.dogName = dog.dogName
    serializedReview.dogId = dog.id
    return serializedReview
  }

  static async getReviewCollectionDetails(reviews) {
    return Promise.all(
      reviews.map((review) => {
        return this.getReviewDetail(review)
      })
    )
  }
}

export default ReviewsSerializer
