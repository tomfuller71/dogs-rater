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
    const votes = await this.getVotes(review)
    
    return {
      ...serializedReview,
      dogName: dog.dogName,
      userName: user.name,
      dogId: dog.id,
      ...votes,
    }
  }

  static async getReviewCollectionDetails(reviews) {
    return Promise.all(
      reviews.map((review) => {
        return this.getReviewDetail(review)
      })
    )
  }

  static async getVotes(review) {
    const votes = await review.$relatedQuery("votes")
    const upVotes = votes.filter((vote) => vote.userVote === "up").length
    const downVotes = votes.length - upVotes

    return { upVotes, downVotes }
  }
}

export default ReviewsSerializer
