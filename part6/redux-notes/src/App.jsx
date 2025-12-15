import "./App.css";
import { toggleImportanceOf } from "./reducers/noteReducer";
import NewNote from "./components/NewNote";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch(); //like setState
  const notes = useSelector((state) => state); //like state
  return (
    <div>
      <NewNote />
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

export default App;
