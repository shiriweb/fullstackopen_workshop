import { createSlice } from "@reduxjs/toolkit";
import { postNewNote, getAll } from "../services/notes";
const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    createNote(state, action) {
      const content = action.payload;
      return state.concat({
        content,
        important: false,
        id: generateId(),
      });
    },
    addAllNotes(state, action) {
      return state.concat(action.payload);
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    },
  },
});

export const { createNote, toggleImportanceOf, addAllNotes } =
  noteSlice.actions;

export const getAndAddAllNotes = () => {
  const getNotesFromAxiosAdDispatch = async (dispatch) => {
    const allNotes = await getAll();
    dispatch(addAllNotes(allNotes));
  };
  return getNotesFromAxiosAdDispatch;
};

export const addNewNoteWithThunk = (content) => {
  const addNoteToAxiosAndDispatch = async (dispatch) => {
    const newNote = await postNewNote(content);
    dispatch(noteSlice.actions.addAllNotes(newNote));
  };
  return addNoteToAxiosAndDispatch;
};

export default noteSlice.reducer;
