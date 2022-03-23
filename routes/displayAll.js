// Route for displaying all the tasks in the database

module.exports = function (app) {
  const task = require("../controllers/task.controller.js");
  app.get("/api/displayAll", task.displayAll);
};
