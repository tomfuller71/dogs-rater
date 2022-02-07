import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";
import objection from "objection";
import UserSerializer from "../../../serializers/UserSerializer.js";

const { ValidationError } = objection;

const usersRouter = new express.Router();

usersRouter.get("/", async (req, res) => {
  const id = req.user.id
  try {
    const user = await User.query().findById(id)
    const serializedUser = await UserSerializer.getUserDetail(user)
    res.status(200).json({ user: serializedUser })
  } catch (error) {
    console.log(error)
    res.status(500).json({errors: error})
  }
})

usersRouter.post("/", async (req, res) => {
  const { email, password, passwordConfirmation, name } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password, name });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default usersRouter;
