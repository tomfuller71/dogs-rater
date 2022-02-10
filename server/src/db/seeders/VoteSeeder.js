import { Vote, User, Dog, Review } from "../../models/index.js"

class VoteSeeder {
  static async seed() {
    
    const francis = await User.query().findOne("name", "Francis")
    const bob = await User.query().findOne("name", "Bob")
    const sara = await User.query().findOne("name", "Sara")

    const francisReviews = await francis.$relatedQuery("reviews")
    for (const review of francisReviews) {
     await review.$relatedQuery("votes")
      .insert({  userVote: "up", userId: bob.id })

      await review.$relatedQuery("votes")
      .insert({  userVote: "down", userId: sara.id })
    }

    const bobReviews = await bob.$relatedQuery("reviews")
    for (const review of bobReviews) {
     await review.$relatedQuery("votes")
      .insert({  userVote: "up", userId: francis.id })

      await review.$relatedQuery("votes")
      .insert({  userVote: "down", userId: sara.id })
    }

    const saraReviews = await sara.$relatedQuery("reviews")
    for (const review of saraReviews) {
     await review.$relatedQuery("votes")
      .insert({  userVote: "up", userId: francis.id })
    }
  }
}

export default VoteSeeder