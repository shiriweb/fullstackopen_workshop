// Selecting the HTML element with the id "root"
const root = document.getElementById("root");


// Initializing the React App inside the selected element
const reactRoot = ReactDOM.createRoot(root);

// Creating the React Component  
const ListPara = (props) => {
  return React.createElement(
    "p",
    { class: "p" },
    `This is my ${props.list} Para`
  );
};

// Creating the App Component and created the element in the React
const App = () => {
  return React.createElement("h1", { class: "h1" }, [
    React.createElement(ListPara, { list: "First" }),
    React.createElement(ListPara, { list: "Second" }),
    React.createElement(ListPara, { list: "Third" }),
    React.createElement(ListPara, { list: "Fourth" }),
    React.createElement(ListPara, { list: "Fifth" }),
  ]);
};

// Rendering the React App
reactRoot.render(React.createElement(App));
