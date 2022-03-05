import { Review } from "../models/index.js"

class ReviewsSerializer {
  static async getReviewDetail(review, userId) {
    const user = await review.$relatedQuery("user")

    const allowedAttributes = ["rating", "description", "id", "userId"]
    let serializedReview = {}
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }

    const dog = await review.$relatedQuery("dog")
    const votes = await this.getVotes(review)
    if (userId) {
      const votes = await review.$relatedQuery("votes")
      const userVote = votes.find((vote) => vote.userId === userId)
      if (userVote) {
        serializedReview.userVote = userVote.userVote
      }
    }

    return {
      ...serializedReview,
      dogName: dog.dogName,
      dogPic: dog.image,
      userName: user.name,
      dogId: dog.id,
      ...votes,
    }
  }

  static async getReviewCollectionDetails(reviews, userId) {
    return Promise.all(
      reviews.map((review) => {
        return this.getReviewDetail(review, userId)
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
