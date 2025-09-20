import React, { useEffect, useState } from "react";
import Note from "./components/Note";
const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNotes, SetNewNotes] = useState("Type something...");
  const [showAll, setShowAll] = useState(true);

  useEffect(
    function () {
      console.log("This is the Use Effect");
    },
    [notes]
  );

  const showingNotes = showAll
    ? notes
    : notes.filter((note) => {
        return note.important === true;
      });

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

  function changeShowState() {
    setShowAll(!showAll);
  }

  return (
    <div>
      <h1>My Notes</h1>
      <button onClick={changeShowState}>
        Show {showAll ? "important" : "all"}
      </button>

      <ul>
        {showingNotes.map((note) => (
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
