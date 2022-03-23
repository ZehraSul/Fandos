// Route for adding a new task

module.exports = function (app) {
  const task = require("../controllers/task.controller.js");
  app.post("/api/create", task.create);
};
