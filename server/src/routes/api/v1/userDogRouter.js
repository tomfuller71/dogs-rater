import express from "express"
import { User } from "../../../models/index.js"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"

const userDogRouter = new express.Router({mergeParams: true})

userDogRouter.post("/", async (req, res) => {
    const {body} = req
    const formInput = cleanUserInput(body)
    const id = req.params.userId
    
    try {
      const user = await User.query().findById(id)
      console.log(user)
      const dog = await user.$relatedQuery("dogs").insertAndFetch(formInput)
      console.log(dog)
      res.status(200).json(dog)
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(422).json({errors: error.data})
      } else {
        res.status(500).json({errors: error})
      }
    }
  }
)

export default userDogRouter