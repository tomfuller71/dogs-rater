import express from "express";
import cleanUserInput from "../../../../services/cleanUserInput.js";
import { Dog } from "../../../models/index.js";
import { User } from "../../../models/index.js"
import objection from "objection"
const { ValidationError } = objection

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

dogsRouter.post("/:dogId", async (req, res) => {
  const { dogId } = req.params
  const { body } = req
  const formInput = cleanUserInput(body)
  formInput.userId = req.user.id
  formInput.dogId = dogId

  try {
    const dog = await Dog.query().findById(dogId)
    const newReview = await dog.$relatedQuery("reviews").insertAndFetch(formInput)
    return res.status(201).json({ newReview: newReview})
  } catch (error) {
    if(error instanceof ValidationError){
      return res.status(422).json({errors: error.data})
    } else {
      return res.status(500).json({errors: error})
    }
  }
})
export default dogsRouter;
