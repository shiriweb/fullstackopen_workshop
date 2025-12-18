import { useEffect } from "react";
import { useState } from "react";

const useCounter = (initialValue = 0) => {
  const [counter, setCounter] = useState(initialValue);

  useEffect(() => {
    console.log("This is the useCounter");
  }, []);

  const handleMinus = () => {
    setCounter(counter - 1);
  };
  const handleMPlus = () => {
    setCounter(counter + 1);
  };
  const handleReset = () => {
    setCounter(0);
  };

  return {
    counter,
    handleMPlus,
    handleMinus,
    handleReset,
  };
};

export default useCounter;
