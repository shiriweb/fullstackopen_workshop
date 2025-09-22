const Note = ({ note, updateNote }) => {
  return (
    <li>
      {note.content}
      <button onClick={updateNote}>{String(note.important)}</button>
    </li>
  );
};
export default Note;
