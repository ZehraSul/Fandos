// Menu schema for mongoose

const mongoose = require("mongoose");

let menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageName: { type: String, required: true },
});

module.exports = mongoose.model("Menu", menuSchema);
