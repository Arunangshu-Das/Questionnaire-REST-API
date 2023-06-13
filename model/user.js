const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
  },
  phone_number: {
    type: String,
    unique: true,
    default: null,
  },
  password: {
    type: String,
  },
  userid: {
    type: String,
  },
  testid: {
    type: String,
    default: null,
  },
  score: {
    type: Number,
    default: 0,
  },
  exam: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
