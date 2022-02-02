import express from "express";

import { Dog } from "../../../models/index.js";

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

dogsRouter.get("/:id", async (req, res) => {
  try {
    const dog = await Dog.query().findById(req.params.id)
    return res.status(200).json({ dog })
  } catch (error) {
    return res.status(500).json({ errors: error });

  }
})
export default dogsRouter;
