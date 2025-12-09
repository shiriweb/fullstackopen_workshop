require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const config = require("./utils/config");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

console.log("The port is ", process.env.PORT);
console.log("The NODE_ENV is ", process.env.NODE_ENV);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;
