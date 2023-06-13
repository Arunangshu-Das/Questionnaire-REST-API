const mongoose = require("mongoose");

const userResponseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  testId: {
    type: String,
    required: true,
  },
  responses: [
    {
      questionId: {
        type: String,
        required: true,
      },
      selectedAnswers: [String],
    },
  ],
  score: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("UserResponse", userResponseSchema);
