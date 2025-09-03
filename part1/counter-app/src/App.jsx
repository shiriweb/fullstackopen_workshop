import React, { useState } from "react";
import Display from "./Display";
import Button from "./Button";

let counterRegular = 0;

function App() {
  const [counter, setCounter] = useState(0);

  function clickHere() {
    counterRegular = counterRegular + 1;

    setCounter(counter + 1);
    let myDiv2 = document.getElementById("myDiv2");
    myDiv2.innerText = `The value of the counterRegular is ${counterRegular}`;
  }

  return (
    <>
      <div id="myDiv"> The value of the counter is {counter}</div>
      <Button onClickFunc={clickHere} label={"Increment"} />

      <Button
        onClickFunc={() => {
          setCounter(counter - 1);
        }}
        label={"Decrement"}
      />

      <Button
        onClickFunc={() => {
          setCounter(0);
        }}
        label={"Reset"}
      />

      <div id="myDiv2">The value of the counterRegular is {counterRegular}</div>

      <Display counter={counter} />
    </>
  );
}
export default App;
