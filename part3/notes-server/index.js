require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const Note = require("./model/note.js");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

// fetching the data from the database
// Note.findById("68e89605f8d4a55b16eb1423").then((result) => {
//   //   result.forEach((note) => {
//   console.log(result);
//   //   });
//   mongoose.connection.close();
// });

// using async/await
// async function getBYId() {
//   const result = await Note.findById("68e8a519a0910d06ffa70d49");
//   console.log(result);
// }
// getBYId();

////////////////////////////////////


// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

// fetching all the notes
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformed Id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT ? process.env.PORT : 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
