// User schema for mongoose

const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  emailAddress: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, default: "basic" },
});

module.exports = mongoose.model("Users", userSchema);
