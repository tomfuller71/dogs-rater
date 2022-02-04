import express from "express";
import { ValidationError } from "objection";

import ReviewsSerializer from "../../../serializers/ReviewSerializer.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { Dog } from "../../../models/index.js";
import dogReviewsRouter from "./dogReviewsRouter.js";

const dogsRouter = new express.Router();

dogsRouter.get("/", async (req, res) => {
  try {
    const dogs = await Dog.query();
    return res.status(200).json({ dogs: dogs });
  } catch (error) {
    console.log(error);
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
    const reviews = await dog.$relatedQuery("reviews");

    const serializedReviews = await ReviewsSerializer.getReviewCollectionDetails(reviews);
    dog.reviews = serializedReviews;

    return res.status(200).json({ dog });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

dogsRouter.use("/:dogId/reviews", dogReviewsRouter);

export default dogsRouter;
