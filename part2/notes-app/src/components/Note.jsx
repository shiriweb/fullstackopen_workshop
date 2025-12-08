const Note = ({ note, updateNote }) => {
  return (
    <li className="note">
      Your Note Here: {note.content}
      <button onClick={updateNote}>{String(note.important)}</button>
    </li>
  );
};
export default Note;
