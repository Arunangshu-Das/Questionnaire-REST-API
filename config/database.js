const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = process.env["MONGODB_URL"];

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Database connected"))
    .catch((error) => {
      console.log("Error happend");
      console.log(error);
      process.exit(1);
    });
};
