// Order schema for mongoose

const mongoose = require("mongoose");

let orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
});

module.exports = mongoose.model("Orders", orderSchema);
