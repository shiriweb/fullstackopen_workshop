import React from "react";
import ListPara from "./ListPara";
const App = () => {
  return (
    <>
      <h1 className="h1">List of Paragraphs</h1>
      <ListPara list="First" />
      <ListPara list="Second" />
      <ListPara list="Third" />
      <ListPara list="Fourth" />
      <ListPara list="Fifth" />
    </>
  );
};

export default App;
