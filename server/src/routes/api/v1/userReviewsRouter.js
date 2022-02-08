import express from "express"
import Review from "../../../models/Review.js"

import cleanUserInput from "../../../services/cleanUserInput.js"

const userReviewsRouter = new express.Router({ mergeParams: true })

userReviewsRouter.delete("/", async (req, res) => {
  const { reviewId } = req.params

  try {
    await Review.query().deleteById(reviewId)
    return res.status(201).json({ message: "Delete successful" })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

userReviewsRouter.patch("/", async (req, res) => {
  const { reviewId } = req.params
  const { body } = req
  const formInput = cleanUserInput(body)
  try {
    const updatedReview = await Review.query().patchAndFetchById(reviewId, formInput)
    return res.status(201).json({ review: updatedReview })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default userReviewsRouter
