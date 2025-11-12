const Note = require("../model/note");
const notesRouter = require("express").Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");

notesRouter.get("/", async (request, response) => {
  const result = await Note.find({}).populate("user", { username: 1, name: 1 });
  response.status(200).send(result);
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  console.log("Authorization header", authorization);
  if (authorization && authorization.startsWith("Bearer")) {
    const token = authorization.replace("Bearer ", "");
    return token;
  }
  return null;
};
notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  try {
    const token = getTokenFrom(request);
    if (!token) {
      return response.status(401).json({ error: "Token missing" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log("Decoded Token:", decodedToken);

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(400).json({ error: "Invalid user" });
    }

    const note = new Note({
      content: body.content,
      important: body.important || false,
      user: user.id,
    });

    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote.id);
    await user.save();
    response.status(201).json(savedNote);
  } catch (error) {
    next(error);
  }
});

// fetching the note by id
notesRouter.get("/:id", async (request, response, next) => {
  try {
    let note = await Note.findById(request.params.id);
    response.json(note);
  } catch (error) {
    next(error);
  }
});

// Deleting the specific note
notesRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    await Note.findByIdAndDelete(id);
    response.status(200).send(`Note deleted successfully with id ${id}`);
  } catch (error) {
    next(error);
  }
});

// Updating the existing note
notesRouter.put("/:id", async (request, response, next) => {
  const { content, important } = request.body;
  try {
    const note = await Note.findById(request.params.id);
    if (!note) {
      return response.status(404).end();
    }

    note.content = content;
    note.important = important;

    return note.save().then((updatedNote) => {
      response.json(updatedNote);
    });
  } catch (error) {
    next(error);
  }
});
module.exports = notesRouter;
