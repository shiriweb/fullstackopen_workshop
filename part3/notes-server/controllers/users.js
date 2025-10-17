const bcrypt = require("bcrypt");
const User = require("../model/user");
const usersRouter = require("express").Router();

usersRouter.get("/", async (request, response, next) => {
  try {
    const result = await User.find({}).populate("notes", {
      content: 1,
      important: 1,
    });
    response.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
