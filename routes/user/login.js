// Route for logging in

module.exports = function (app) {
  const user = require("../../controllers/user.controller.js");
  app.post("/api/login", user.login);
};
