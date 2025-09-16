import React, { useState } from "react";
import Note from "./components/Note";
const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNotes, SetNewNotes] = useState("Type something...");
  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);

    const object = {
      id: notes[notes.length - 1].id + 1,
      content: newNotes,
      important: Math.random() < 0.5,
    };

    setNotes([...notes, object]);
    SetNewNotes("");
  }

  function handleChange(event) {
    SetNewNotes(event.target.value);
  }

  return (
    <div>
      <h1>My Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={newNotes} onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  );
};
export default App;
