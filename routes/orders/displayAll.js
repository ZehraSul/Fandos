// Route for displaying all the orders in the database

module.exports = function (app) {
  const orders = require("../../controllers/order.controller.js");
  app.get("/api/orders/displayAll", orders.displayAll);
};
