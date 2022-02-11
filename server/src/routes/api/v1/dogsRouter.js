import express from "express"
import { ValidationError } from "objection"

import { Dog } from "../../../models/index.js"

import cleanUserInput from "../../../services/cleanUserInput.js"
import dogReviewsRouter from "./dogReviewsRouter.js"
import DogSerializer from "../../../serializers/DogSerializer.js"
import uploadImage from "../../../services/uploadImage.js"

const dogsRouter = new express.Router()

dogsRouter.get("/", async (req, res) => {
  try {
    const dogs = await Dog.query()
    const serializedDogs = await DogSerializer.getDogCollectionDetails(dogs)

    return res.status(200).json({ dogs: serializedDogs })
  } catch (error) {

    return res.status(500).json({ errors: error })
  }
})

dogsRouter.post("/", uploadImage.single("image"), async (req, res) => {
  const { file } = req
  try {
    const formInput = {
      ...cleanUserInput(req.body),
      image: file ? file.location : null
    }

    const dog = await Dog.query().insertAndFetch(formInput)

    return res.status(201).json({ dog })
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({ errors: error.data })
    } else {
      res.status(500).json({ errors: error })
    }
  }
})

dogsRouter.get("/:id", async (req, res) => {
  const { user } = req
  try {
    const dog = await Dog.query().findById(req.params.id)
    const userId =  user ? user.id : null
    const serializedDog = await DogSerializer.getDogDetail(dog, userId)

    return res.status(200).json({ dog: serializedDog })
  } catch (error) {

    return res.status(500).json({ errors: error })
  }
})

dogsRouter.use("/:dogId/reviews", dogReviewsRouter)

export default dogsRouter
