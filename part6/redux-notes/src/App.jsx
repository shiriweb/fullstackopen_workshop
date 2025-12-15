import "./App.css";
import NewNote from "./components/NewNote";
import VisibilityFilter from "./components/VisibilityFilter";
import Notes from "./components/Notes";

const App = () => {
  return (
    <div>
      <VisibilityFilter />
      <NewNote />
      <Notes />
    </div>
  );
};

export default App;
