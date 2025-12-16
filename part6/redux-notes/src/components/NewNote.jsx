import { addNewNoteWithThunk } from "../reducers/noteReducer";
import { useDispatch } from "react-redux";

const NewNote = () => {
  const dispatch = useDispatch();
  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    dispatch(addNewNoteWithThunk(content));
    // postNewNote(content).then((data) => {
    //   dispatch(addAllNotes(data));
    // });
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">Add</button>
    </form>
  );
};

export default NewNote;
