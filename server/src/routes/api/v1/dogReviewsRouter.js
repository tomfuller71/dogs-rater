import express from "express";
import objection from "objection";
const { ValidationError } = objection;

import { Dog } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";

const dogReviewsRouter = new express.Router({ mergeParams: true });

dogReviewsRouter.post("/", async (req, res) => {
  const { dogId } = req.params;
  const { body } = req;
  const formInput = cleanUserInput(body);
  formInput.userId = req.user.id;
  formInput.dogId = dogId;

  try {
    const dog = await Dog.query().findById(dogId);
    const newReview = await dog.$relatedQuery("reviews").insertAndFetch(formInput);
    return res.status(201).json({ newReview: newReview });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    } else {
      return res.status(500).json({ errors: error });
    }
  }
});
export default dogReviewsRouter;
