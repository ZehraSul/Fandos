// Route for displaying all the User's cart items

module.exports = function (app) {
  const cart = require("../../controllers/cart.controller.js");
  app.get("/api/cart/displayAll", cart.displayAll);
};
