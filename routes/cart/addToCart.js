// Route for adding to cart

module.exports = function (app) {
  const cart = require("../../controllers/cart.controller.js");
  app.patch("/api/cart/add", cart.addToCart);
};
