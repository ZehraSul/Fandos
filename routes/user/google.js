// Route for logging in with google

module.exports = function (app) {
  const user = require("../../controllers/user.controller.js");
  app.post("/api/login/google", user.googleLogin);
};
