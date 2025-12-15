import React from "react";

const filterReducer = (state = "ALL", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

// action creator
export const filterChange = (filter) => ({
  type: "SET_FILTER",
  payload: filter,
});

export default filterReducer;
