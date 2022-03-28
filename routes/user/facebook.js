// Route for logging in with Facebook

module.exports = function (app) {
  const user = require("../../controllers/user.controller.js");
  app.post("/api/login/facebook", user.facebookLogin);
};
