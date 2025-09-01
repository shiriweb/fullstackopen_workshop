import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";

const root = document.getElementById("root");

const reactRoot = ReactDOM.createRoot(root);

reactRoot.render(React.createElement(App));
