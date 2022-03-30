// Route for removing item from cart

module.exports = function (app) {
  const cart = require("../../controllers/cart.controller.js");
  app.patch("/api/cart/remove", cart.removeFromCart);
};
