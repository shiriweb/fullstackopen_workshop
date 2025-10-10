const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

////////////
// Connecting database
const password = process.argv[2];
const url = `mongodb+srv://shirisha:${password}@cluster0.q8zc9wj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// mongoose.set('strictQuery',false)
mongoose.connect(url);
//////////////

// ----------------
// defining the schema
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});
// ------------------

// creating the model for the schema
const Note = mongoose.model("Note", noteSchema);

// Instance of the model
// Creating the new the data

// const note = new Note({
//   content: "Js is interesting",
//   important: false,
// });

// Saving the data to the database
// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

// fetching the data from the database
// Note.findById('68e89605f8d4a55b16eb1423').then((result) => {
// //   result.forEach((note) => {
//     console.log(result);
// //   });
//   mongoose.connection.close();
// });


// using async/await 
async function getBYId() {
  const result = await Note.findById("68e8a519a0910d06ffa70d49");
  console.log(result);
}
getBYId();
