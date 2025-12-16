import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [
  {
    content: "Reducer define how state works",
    important: true,
    id: 1,
  },
  {
    content: "State of the store can contain any data ",
    important: false,
    id: 2,
  },
];
const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    createNote(state, action) {
      console.log("createNote action", action);
      console.log("createNote state", current(state));

      const content = action.payload;
      state.push({
        content,
        important: false,
        id: generateId(),
      });
    },
    toggleImportanceOf(state, action) {
      console.log("toggle action", action);

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

// const noteReducer = (state = initialState, action) => {
//   if (action.type === "NEW_NOTE") {
//     // state.push(action.payload);
//     let newState = [...state, action.payload];
//     return newState;
//   }

//   if (action.type === "TOGGLE_IMPORTANCE") {
//     let myState = state.find((note) => note.id === action.payload.id);
//     let myUpdatedState = { ...myState, important: !myState.important };
//     let newState = state.map((note) =>
//       note.id === myUpdatedState.id ? myUpdatedState : note
//     );
//     return newState;
//   }
//   return state;
// };

// export const createNote = (content) => {
//   return {
//     type: "NEW_NOTE",
//     payload: {
//       content,
//       important: false,
//       id: generateId(),
//     },
//   };
// };

// export const toggleImportanceOf = (id) => {
//   return {
//     type: "TOGGLE_IMPORTANCE",
//     payload: {
//       id,
//     },
//   };
// };

export const { createNote, toggleImportanceOf } = noteSlice.actions;
export default noteSlice.reducer;
