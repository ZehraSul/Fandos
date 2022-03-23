// Route for displaying all the menu items in the database

module.exports = function (app) {
  const menu = require("../../controllers/menu.controller.js");
  app.get("/api/menu/displayAll", menu.displayAll);
};
