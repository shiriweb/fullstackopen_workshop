import React from "react";
const ListPara = (props) => {
  //   return React.createElement(
  //     "p",
  //     { class: "p" },
  //     `This is my ${props.list} Para`
  //   );

  return <p> This is my {props.list} Para</p>;
};

export default ListPara;
