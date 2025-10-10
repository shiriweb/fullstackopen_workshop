const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

// middleware concept
// function myMiddle(_, _, next) {
//   console.log("Middleware");
//   next();
// }
// app.use(myMiddle);

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

////////////////////////////////

// Connecting database
const url = `mongodb+srv://shirisha:password12345@cluster0.q8zc9wj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// mongoose.set('strictQuery',false)
mongoose.connect(url);

// ----------------
// defining the schema
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});
// ------------------

// creating the model for the schema
const Note = mongoose.model("Note", noteSchema);

// Instance of the model
// Creating the new the data

// const note = new Note({
//   content: "Js is interesting",
//   important: false,
// });

// // Saving the data to the database
// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

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
app.post("/api/notes", (request, response) => {
  const note = request.body;
  note.id = String(notes.length + 1);
  if (!note.content) {
    return response.status(404).json({
      error: "Content Missing",
    });
  }
  const myNote = {
    id: String(notes.length) + 1,
    content: note.content,
    important: note.important || false,
  };
  notes.push(myNote);
  response.status(201).json(myNote);
  console.log(myNote);
  // response.json(note);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const PORT = process.env.PORT ? process.env.PORT : 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
