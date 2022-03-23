// Route for registering

module.exports = function (app) {
  const user = require("../../controllers/user.controller.js");
  app.post("/api/register", user.register);
};
