import React, { useEffect, useState } from "react";
import noteService from "./services/note";
import loginServices from "./services/login";
import Note from "./components/Note";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNotes, setNewNotes] = useState("Type something...");
  const [showAll, setShowAll] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [showNoteForm, setShowNoteForm] = useState(false);

  useEffect(() => {
    noteService.getAll().then((data) => setNotes(data));
    const loggedUser = JSON.parse(window.localStorage.getItem("myAuth"));
    if (loggedUser) {
      setUser(loggedUser);
      noteService.setToken(loggedUser.token);
    }
  }, []);

  const showingNotes = showAll
    ? notes
    : notes.filter((note) => note.important);

  function handleSubmit(event) {
    event.preventDefault();

    const object = {
      content: newNotes,
      important: Math.random() < 0.5,
    };

    noteService.create(object).then((data) => {
      setNotes([...notes, data]);
      setNewNotes("");
      setShowNoteForm(false); 
    });
  }

  function toggleImportant(id) {
    const currentNote = notes.find((note) => note.id === id);
    const updatedNote = { ...currentNote, important: !currentNote.important };

    noteService
      .update(id, updatedNote)
      .then((data) => {
        setNotes(notes.map((note) => (note.id !== id ? note : data)));
      })
      .catch(() => {
        alert(`The note with id ${id} does not exist`);
        setNotes(notes.filter((note) => note.id !== id));
      });
  }

  async function handleLogin(event) {
    event.preventDefault();
    const loggedUser = await loginServices.login({ username, password });
    setUser(loggedUser);
    noteService.setToken(loggedUser.token);
    window.localStorage.setItem("myAuth", JSON.stringify(loggedUser));
  }

  function loginForm() {
    return (
      <>
        <h1>My Notes</h1>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </>
    );
  }

  function notesForm() {
    return (
      <form onSubmit={handleSubmit}>
        <input
          value={newNotes}
          onChange={(e) => setNewNotes(e.target.value)}
        />
        <button type="submit">save</button>
      </form>
    );
  }

  return (
    <div>
      {!user && loginForm()}

      {user && (
        <div>
          <p>{user.name} logged in</p>

          {!showNoteForm && (
            <button onClick={() => setShowNoteForm(true)}>new note</button>
          )}

          {showNoteForm && notesForm()}
        </div>
      )}

      <hr />
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? "important" : "all"}
      </button>

      <ul>
        {showingNotes.map((note) => (
          <Note
            key={note.id}
            note={note}
            updateNote={() => toggleImportant(note.id)}
          />
        ))}
      </ul>

      <p style={{ color: "green", fontStyle: "italic" }}>
        Note App, Tej Center
      </p>
    </div>
  );
}

export default App; 