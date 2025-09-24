const express = require("express");
const app = express();

app.use(express.json());
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

// fetching all the notes
app.get("/api/notes", (request, response) => {
  response.json(notes);
  console.log(notes);
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

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
