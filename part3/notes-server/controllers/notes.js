const Note = require("../model/note");
const notesRouter = require("express").Router();
notesRouter.get("/", async (request, response) => {
  console.log("Notes get all: Start");
  const result = await Note.find({});
  console.log("Notes get all: Middle");
  response.status(200).send(result);
  console.log("Notes get all: End");
});

notesRouter.post("/", (request, response, next) => {
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
notesRouter.get("/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      response.json(note);
    })
    .catch((error) => {
      next(error);
    });
});

// Deleting the specific note
notesRouter.delete("/:id", (request, response, next) => {
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
notesRouter.put("/:id", (request, response, next) => {
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
module.exports = notesRouter;
