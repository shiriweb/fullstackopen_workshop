import React from "react";
const SayHello = ({ person }) => {
  function getFullName() {
    return `${person.firstName} ${person.lastName}`;
  }
  return <p>Hello {getFullName()}</p>;
};

export default SayHello;
