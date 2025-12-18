import { useState } from "react";
import useCounter from "./hooks/useCounter";
const Counter = () => {
  const count = useCounter(0);
  const count2 = useCounter(0);
  return (
    <div style={{ display: "flex" }}>
      <div>
        <div>{count.counter}</div>
        <button onClick={count.handleMPlus}>plus</button>
        <button onClick={count.handleReset}>zero</button>
        <button onClick={count.handleMinus}>minus</button>
      </div>
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <div>
        <div>{count2.counter}</div>
        <button onClick={count2.handleMPlus}>plus</button>
        <button onClick={count2.handleReset}>zero</button>
        <button onClick={count2.handleMinus}>minus</button>
      </div>
    </div>
  );
};

export default Counter;
