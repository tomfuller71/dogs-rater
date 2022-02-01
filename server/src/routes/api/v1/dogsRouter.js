import express from "express";

import { Dog } from "../../../models/index.js";

//import DogSerializer from....

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

// dogsRouter.get("/:id", async (req, res) => {
//   const id = req.params.id

//   try {
//     const dog = await Dog.query().findById(id)

//     //serialized line

//     return res.status(200).json({ dog: })
//   } catch (err) {
//     return res.status(500).json({ errors: err })
//   }
// })

export default dogsRouter;
