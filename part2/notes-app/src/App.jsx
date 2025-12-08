import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Note from "./components/Note";
import noteService from "./services/note";
import loginServices from "./services/login";
import Togglable from "./components/Togglable";
import NoteForm from "./components/NoteForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
function App() {
  const [notes, setNotes] = useState([]);
  const [newNotes, SetNewNotes] = useState("Type something...");
  const [showAll, setShowAll] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();


  useEffect(function () {
    noteService.getAll().then((data) => {
      setNotes(data);
    });
    const newUser = JSON.parse(window.localStorage.getItem("myAuth"));
    setUser(newUser);
    if (newUser && newUser.token) {
      noteService.setToken(newUser.token);
    }
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
  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);

    const object = {
      content: newNotes,
      important: Math.random() < 0.5,
    };
    createNote(object);
    SetNewNotes("");
  }

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

  const loginForm = () => {
    return (
      <div>
        <Togglable>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    );
  };

  

  function notesForm() {
    return (
      <Togglable buttonLabel="New Note" ref={noteFormRef}>
        <NoteForm createNote={createNote} />
      </Togglable>
    );
  }

  return (
    <div>
      <h1>My Notes</h1>

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
