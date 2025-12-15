import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Notes = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch(); //like setState
  const notes = useSelector((state) =>
    filter === "ALL"
      ? state.notes
      : filter === "IMPORTANT"
      ? state.notes.filter((note) => note.important)
      : state.notes.filter((note) => !note.important)
  ); //like state
  return (
    <div>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => {
              dispatch(toggleImportanceOf(note.id));
            }}
          >
            {note.content}{" "}
            <strong>{note.important ? "important" : "not important "}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
