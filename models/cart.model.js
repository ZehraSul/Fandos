// Cart schema for mongoose

const mongoose = require("mongoose");

let cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
});

module.exports = mongoose.model("Cart", cartSchema);
