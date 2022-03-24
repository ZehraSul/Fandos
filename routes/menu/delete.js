// Route for creating a menu item in the database

module.exports = function (app) {
  const menu = require("../../controllers/menu.controller.js");
  app.delete("/api/menu/delete", menu.delete);
};
