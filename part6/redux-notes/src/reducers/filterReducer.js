import { createSlice } from "@reduxjs/toolkit";
import React from "react";
const filterSlice = createSlice({
  name: "filter",
  initialState: "ALL",
  reducers: {
    filterChange(state, action) {
      console.log("Filter Action", action);

      return action.payload;
    },
  },
});

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;
