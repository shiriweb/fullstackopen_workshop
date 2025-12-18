import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
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
      </button>   <button
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

  return (
    <BrowserRouter>
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
      </div>

      <Routes>
        <Route path="/notes/:id" element={<Note notes={notes} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
        <Route path="/notes123" element={<Notes notes={notes} />} />
        <Route path="/notes456" element={<Navigate replace to="/notes" />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </BrowserRouter>
  );
};

export default App;
