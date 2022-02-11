import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Dog, Review, Vote } from "../../../models/index.js"
import ReviewsSerializer from "../../../serializers/ReviewSerializer.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const dogReviewsRouter = new express.Router({ mergeParams: true })

dogReviewsRouter.post("/", async (req, res) => {
  const { dogId } = req.params
  const formInput = {
    ...cleanUserInput(req.body),
    userId: req.user.id,
    dogId: dogId
  }

  try {
    const dog = await Dog.query().findById(dogId)
    const review = await dog.$relatedQuery("reviews").insertAndFetch(formInput)
    const serializedReview = await ReviewsSerializer.getReviewDetail(review)

    return res.status(201).json({ newReview: serializedReview })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})

dogReviewsRouter.post("/votes", async (req, res) => {
  const { userVote, reviewId } = req.body

  if (!req.user) {
    return res.status(201).json({ message: "Log in required" })
  }
  const userId = req.user.id

  try {
    const votedReview = await Review.query().findById(reviewId)
    await votedReview.$relatedQuery("votes").insert({ userVote, userId })
    return res.status(201).json({ message: "Vote logged" })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

dogReviewsRouter.delete("/votes", async (req, res) => {
  const { reviewId } = req.body
  const userId = req.user.id

  if (!req.user) return res.status(201).json({ message: "Log in required" })

  try {
    await Vote.query()
      .delete()
      .where('reviewId', reviewId)
      .where('userId', userId)
      
    return res.status(201).json({ message: "Vote removed" })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default dogReviewsRouter
