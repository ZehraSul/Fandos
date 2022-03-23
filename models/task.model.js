// Task schema for mongoose

const mongoose = require("mongoose");

let taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Tasks", taskSchema);
