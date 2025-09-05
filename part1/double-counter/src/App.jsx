import React, { useState } from "react";
import Button from "../../counter-app/src/Button";
import Display from "./Display";

const App = () => {
  let [counter, setCounter] = useState({
    left: 0,
    right: 0,
  });

  let [clickHistory, setClickHistory] = useState([]);
  let [totalClicks, setTotalClicks] = useState(0);

  function clickLeft() {
    console.log("Counter before button clicked", counter);
    setCounter({ ...counter, left: counter.left + 1 });
    setClickHistory([...clickHistory, "Left Button Clicked"]);
    setTotalClicks(totalClicks + 1);

    console.log(clickHistory);

    console.log("Counter after button clicked", counter);
  }

  function clickRight() {
    console.log("Counter before the button clicked", counter);
    setCounter({ ...counter, right: counter.right + 1 });
    setClickHistory([...clickHistory, "Right Button Clicked"]);
    setTotalClicks(totalClicks + 1);

    console.log(clickHistory);

    console.log("Counter after the button clicked", counter);
  }

  return (
    <>
      <div>
        {counter.left}
        <Button onClickFunc={clickLeft} label={"Increment Left"} />
        <Button onClickFunc={clickRight} label={"Increment Right"} />
        {counter.right}
      </div>

      <div>
        <p>The history of Click is {clickHistory.join(",")}</p>
      </div>

      <Display total={totalClicks} />
    </>
  );
};
export default App;
