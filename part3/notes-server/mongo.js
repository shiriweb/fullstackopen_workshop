const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

////////////
// Connecting database
const password = process.argv[2]
const url = `mongodb+srv://shirisha:${password}@cluster0.q8zc9wj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// mongoose.set('strictQuery',false)
mongoose.connect(url)
//////////////

// ----------------
// defining the schema 
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})
// ------------------


// creating the model for the schema
const Note = mongoose.model('Note', noteSchema)

