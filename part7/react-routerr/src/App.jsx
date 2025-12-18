import {
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
  useMatch,
} from "react-router-dom";
import Notes from "./Notes";
import Note from "./Note";

const Home = () => (
  <div>
    {" "}
    <h2>TKTL notes app</h2>{" "}
  </div>
);

const Users = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <h2>Users</h2>{" "}
      <button
        onClick={() => {
          console.log("go to notes");
          navigate("/notes123");
        }}
      >
        Go to notes123
      </button>{" "}
      <button
        onClick={() => {
          console.log("go to notes");
          navigate("/notes456");
        }}
      >
        Go to notes456
      </button>
    </div>
  );
};

const App = ({ notes }) => {
  const padding = {
    padding: 5,
  };
  const match = useMatch("/notes/:id");
  console.log("match is", match);

  const note = match ? notes.find((note) => note.id === match.params.id) : null;

  return (
    <>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        <a href="/users">Another User</a>
      </div>

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
        <Route path="/notes123" element={<Notes notes={notes} />} />
        <Route path="/notes456" element={<Navigate replace to="/notes" />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </>
  );
};

export default App;
