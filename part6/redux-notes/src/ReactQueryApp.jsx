import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAll, createNote, updatedNote } from "./services/result";
const App = () => {
  const queryClient = useQueryClient();
  //get all notes
  const result = useQuery({
    queryKey: ["notes"],
    queryFn: getAll,
    refetchOnWindowFocus: false,
  });

  //creating note with mutation\
  const newNoteMutation = useMutation({
    mutationFn: createNote, //post request
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ["notes"], //get all request
      // });

      const notes = queryClient.getQueryData(["notes"]);
      queryClient.setQueryData(["notes"], notes.concat(newNote));
    },
  });

  // update note mutation
  const updatedNoteMutation = useMutation({
    mutationFn: updatedNote, //put request
    onSuccess: () => {
      queryClient.invalidateQueries("notes"); //get all notes request
    },
  });

  console.log(result);

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    console.log(content);
    newNoteMutation.mutate({ content, important: true });
  };

  const toggleImportance = (note) => {
    console.log("toggle importance of", note.id);
    updatedNoteMutation.mutate({ ...note, important: !note.important });
  };

  const notes = result.data;

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? "important" : "not important"}</strong>
        </li>
      ))}
    </div>
  );
};

export default App;
