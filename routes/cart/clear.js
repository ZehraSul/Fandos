// Route for clearing the cart

module.exports = function (app) {
  const cart = require("../../controllers/cart.controller.js");
  app.delete("/api/cart/clear", cart.clearCart);
};
