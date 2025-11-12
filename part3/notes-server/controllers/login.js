const bcrypt = require("bcrypt");
const User = require("../model/user");
const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  console.log(user);

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  console.log("Status of our password is :", passwordCorrect);
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "Invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });
  console.log("Generated token is:", token);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
