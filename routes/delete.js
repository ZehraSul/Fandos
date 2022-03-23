// Route for deleting a task

module.exports = function (app) {
  const task = require("../controllers/task.controller.js");
  app.delete("/api/delete", task.deleteTask);
};
