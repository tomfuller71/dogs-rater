import express from "express";

import { Review, Dog } from "../../../models/index.js";
import getReviewsDetails from "../../../serializers/ReviewSerializer.js";

const reviewsRouter = new express.Router();

reviewsRouter.get("/:dogId", async (req, res) => {
  const dog = await Dog.query().findById(req.params.dogId);
  const reviews = await dog.$relatedQuery("reviews");
  const serializedReviews = await getReviewsDetails(reviews);
  res.status(200).json({ reviews: serializedReviews });
});

export default reviewsRouter;
