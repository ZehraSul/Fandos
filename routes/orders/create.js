// Route for creating an order from items in the cart

module.exports = function (app) {
  const orders = require("../../controllers/order.controller.js");
  app.post("/api/orders/create", orders.create);
};
