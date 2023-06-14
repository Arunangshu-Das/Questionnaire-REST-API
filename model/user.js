const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
  },
  pno: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("hello", userSchema);
