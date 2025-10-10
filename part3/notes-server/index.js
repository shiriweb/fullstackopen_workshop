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
let notes = [];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

// fetching all the notes
app.get("/api/notes", (request, response) => {
  Note.find({}).then((result) => {
    response.status(200).send(result);
  });
});

app.post("/api/notes", (request, response) => {
  const body = request.body;
  const note = new Note({
    content: body.content,
    important: false,
  });

  // Saving the data to the database
  note.save().then((result) => {
    console.log("note saved!");
    response.status(201).send(result);
  });
});

// fetching the note by id
app.get("/api/notes/:id", (request, response) => {
  const myId = request.params.id;
  const myNote = notes.find((note) => note.id === myId);
  if (myNote) {
    response.json(myNote);
  } else {
    response.status(404).end();
  }
});

// Deleting the specific note
app.delete("/api/notes/:id", (request, response) => {
  const myId = request.params.id;
  notes = notes.filter((note) => note.id !== myId);
  response.status(202).end();
});

// Adding or creating the new note

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const PORT = process.env.PORT ? process.env.PORT : 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
