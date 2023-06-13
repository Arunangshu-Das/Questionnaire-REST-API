const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionId:{
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  options: [
    {
      text: String,
    },
  ],
  answers:[]
});

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
});

module.exports = mongoose.model("Test", testSchema);



