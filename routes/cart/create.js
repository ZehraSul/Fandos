// Route for creating a cart item in the database

module.exports = function (app) {
  const cart = require("../../controllers/cart.controller.js");
  app.post("/api/cart/create", cart.create);
};
