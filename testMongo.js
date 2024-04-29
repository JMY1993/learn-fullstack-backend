const { default: mongoose } = require("mongoose");
const { Note } = require("./model/mongo");

console.log("testing mongoDB atlas");
const note = new Note({
  content: "HTML is Easy",
  important: false,
});

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close();
})