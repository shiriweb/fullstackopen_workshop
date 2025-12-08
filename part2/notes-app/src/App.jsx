import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Note from "./components/Note";
import noteService from "./services/note";
import loginServices from "./services/login";
import Togglable from "./components/Togglable";
import NoteForm from "./components/NoteForm";
function App() {
  const [notes, setNotes] = useState([]);
  const [newNotes, SetNewNotes] = useState("Type something...");
  const [showAll, setShowAll] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  useEffect(function () {
    // Getting notes from server
    //   axios.get("http://localhost:3001/notes").then((response) => {
    //     setNotes(response.data);
    //   });

    noteService.getAll().then((data) => {
      setNotes(data);
    });
    setUser(JSON.parse(window.localStorage.getItem("myAuth")));
  }, []);

  const showingNotes = showAll
    ? notes
    : notes.filter((note) => {
        return note.important === true;
      });

  const createNote = (object) => {
    noteFormRef.current.toggleVisibility();
    noteService.create(object).then((data) => {
      setNotes(notes.concat(data));
    });
  };

  function handleChange(event) {
    SetNewNotes(event.target.value);
  }

  function changeShowState() {
    setShowAll(!showAll);
  }

  function toggleImportant(id) {
    const currentNote = notes.find((note) => note.id === id);
    const currentNoteCopy = {
      ...currentNote,
      important: !currentNote.important,
    };

    // Update the existing note
    // axios
    //   .put(`http://localhost:3001/notes/${id}`, currentNoteCopy)
    //   .then((response) => {
    //     const updateNotes = notes.map((note) =>
    //       note.id !== id ? note : response.data
    //     );
    //     setNotes(updateNotes);
    //   });

    noteService
      .update(id, currentNoteCopy)
      .then((data) => {
        const updateNotes = notes.map((note) => (note.id !== id ? note : data));
        setNotes(updateNotes);
      })
      .catch((error) => {
        console.log(error);
        alert(`The node with id ${id} does not exists`);
        setNotes(notes.filter((note) => note.id !== id));
      });
  }

  async function handleLogin(event) {
    event.preventDefault();
    let myUser = await loginServices.login({ username, password });
    setUser(myUser);
    noteService.setToken(myUser.token);
    window.localStorage.setItem("myAuth", JSON.stringify(myUser));
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
      <Togglable buttonLabel="New Note" ref={noteFormRef}>
        <NoteForm createNote={createNote} />
      </Togglable>
    );
  }

  return (
    <div>
      {!user && loginForm()}
      <br />
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {notesForm()}
        </div>
      )}

      <hr />
      <button onClick={changeShowState}>
        Show {showAll ? "important" : "all"}
      </button>

      <ul>
        {showingNotes.map((note) => (
          <Note
            key={note.id}
            note={note}
            updateNote={() => {
              toggleImportant(note.id);
            }}
          />
        ))}
      </ul>
    </div>
  );
}
export default App;
