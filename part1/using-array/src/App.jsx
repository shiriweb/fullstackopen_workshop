import React from "react";
import SayHello from "./SayHello";
const App = () => {
  let persons = [
    {
      firstName: "Ram",
      lastName: "Sharma",
      id: 101,
    },
    {
      firstName: "Kiran",
      lastName: "Kc",
      id: 102,
    },
    {
      firstName: "Om",
      lastName: "Yadav",
      id: 103,
    },
    {
      firstName: "Sam",
      lastName: "Shrestha",
      id: 104,
    },
    {
      firstName: "Sita",
      lastName: "Bhandari",
      id: 105,
    },
  ];
  return (
    <>
      <h1 className="h1">Hello World</h1>

      {persons.length === 0 ? (
        <p>There are no people</p>
      ) : (
        persons
          .filter((element) => element.id >= 103)
          .map((person) => <SayHello person={person} key={person.id} />)
      )}
    </>
  );
};

export default App;
