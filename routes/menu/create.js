// Route for creating a menu item in the database

module.exports = function (app) {
  const menu = require("../../controllers/menu.controller.js");
  app.post("/api/menu/create", menu.create);
};
