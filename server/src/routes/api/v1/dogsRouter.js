import express from "express";
import { ValidationError } from "objection";

import ReviewsSerializer from "../../../serializers/ReviewSerializer.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { Dog } from "../../../models/index.js";
import dogReviewsRouter from "./dogReviewsRouter.js";
import DogSerializer from "../../../serializers/DogSerializer.js";

const dogsRouter = new express.Router();

dogsRouter.get("/", async (req, res) => {
  try {
    const dogs = await Dog.query();
    const serializedDogs = await DogSerializer.getDogCollectionDetails(dogs)
    return res.status(200).json({ dogs: serializedDogs });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

dogsRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);
  formInput.userId = req.user.id;

  try {
    const dog = await Dog.query().insertAndFetch(formInput);
    res.status(200).json(dog);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({ errors: error.data });
    } else {
      res.status(500).json({ errors: error });
    }
  }
});

dogsRouter.get("/:id", async (req, res) => {
  try {
    const dog = await Dog.query().findById(req.params.id);
    const serializedDog = await DogSerializer.getDogDetail(dog);

    return res.status(200).json({ dog: serializedDog });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

dogsRouter.use("/:dogId/reviews", dogReviewsRouter);

export default dogsRouter;
