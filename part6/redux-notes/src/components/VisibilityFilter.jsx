import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const VisibilityFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const filterSelected = (filter) => {
    console.log(filter);
    dispatch(filterChange(filter));
  };
  return (
    <div>
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected("ALL")}
      />
      All
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected("IMPORTANT")}
      />{" "}
      Important{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected("NOT_IMPORTANT")}
      />
      Not Important
    </div>
  );
};

export default VisibilityFilter;
