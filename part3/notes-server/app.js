require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const Note = require("./model/note.js");

app.use(middleware.requestLogger);

app.get("/api/notes", (request, response, next) => {
  Note.find({})
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/notes", (request, response, next) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => {
      next(error);
    });
});
// fetching the note by id
app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      response.json(note);
    })
    .catch((error) => {
      next(error);
    });
});

// Deleting the specific note
app.delete("/api/notes/:id", (request, response, next) => {
  const id = request.params.id;
  const deletedNote = Note.findByIdAndDelete(id);
  deletedNote
    .then(() => {
      response.status(200).send(`Note deleted successfully with id ${id}`);
    })
    .catch((error) => {
      next(error);
    });
});

// Updating the existing note
app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end();
      }

      note.content = content;
      note.important = important;

      return note.save().then((updatedNote) => {
        response.json(updatedNote);
      });
    })
    .catch((error) => next(error));
});

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;
