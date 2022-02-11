import express from "express"
import Review from "../../../models/Review.js"
import User from "../../../models/User.js"

import cleanUserInput from "../../../services/cleanUserInput.js"
import UserSerializer from "../../../serializers/UserSerializer.js"

const userReviewsRouter = new express.Router({ mergeParams: true })

userReviewsRouter.delete("/", async (req, res) => {
  const { reviewId, userId } = req.params

  try {
    const review = await Review.query().findById(reviewId)
    await review.$relatedQuery("votes").delete()
    await Review.query().deleteById(reviewId)
    const user = await User.query().findById(userId)
    const serializedUser = await UserSerializer.getUserDetail(user)

    return res.status(201).json({ data: serializedUser })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

userReviewsRouter.patch("/", async (req, res) => {
  const { reviewId, userId } = req.params
  const { body } = req
  const formInput = cleanUserInput(body)
  try {
    const updatedReview = await Review
      .query()
      .patchAndFetchById(reviewId, formInput)
    
    const user = await User.query().findById(userId)
    const serializedUser = await UserSerializer.getUserDetail(user)

    return res.status(201).json({ data: serializedUser })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default userReviewsRouter
