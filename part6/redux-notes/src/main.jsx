import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
// let myRoot = createRoot(document.getElementById("root"));
// function myRender() {
//   myRoot.render(<App />);
// }

// myRender();
// store.subscribe(myRender);
