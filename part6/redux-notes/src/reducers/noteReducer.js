const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteReducer = (state = [], action) => {
  if (action.type === "NEW_NOTE") {
    // state.push(action.payload);
    let newState = [...state, action.payload];
    return newState;
  }

  if (action.type === "TOGGLE_IMPORTANCE") {
    let myState = state.find((note) => note.id === action.payload.id);
    let myUpdatedState = { ...myState, important: !myState.important };
    let newState = state.map((note) =>
      note.id === myUpdatedState.id ? myUpdatedState : note
    );
    return newState;
  }
  return state;
};

export const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    payload: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    payload: {
      id,
    },
  };
};

export default noteReducer;
