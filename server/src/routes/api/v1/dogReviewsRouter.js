import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Dog, Review } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const dogReviewsRouter = new express.Router({ mergeParams: true })

dogReviewsRouter.post("/", async (req, res) => {
  const { dogId } = req.params
  const { body } = req
  const formInput = cleanUserInput(body)
  formInput.userId = req.user.id
  formInput.dogId = dogId

  try {
    const dog = await Dog.query().findById(dogId)
    const newReview = await dog.$relatedQuery("reviews").insertAndFetch(formInput)
    const user = await newReview.$relatedQuery("user")
    newReview.userName = user.name
    return res.status(201).json({ newReview: newReview })
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
  if(!req.user) {
    return res.status(201).json({ message: "Log in required"})
  }
  const userId = req.user.id

  try {
    const votedReview = await Review.query().findById(reviewId)
    const voters = await votedReview.$relatedQuery("voters")
    const alreadyVoted = voters.some((voter) => voter.id === userId)

    if(!alreadyVoted){
      await votedReview.$relatedQuery("votes").insert({ userVote, userId })
      return res.status(201).json({ message: "Vote logged" })
    } else {
      return res.status(201).json({ message: "Already voted"})
    }
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default dogReviewsRouter
