const Menu = require("../models/menu.model.js");
const Users = require("../models/user.model.js");

/* Add new task to database, pass in object with the data from the user inputs.*/
// exports.create = function (req, res) {
//   Users.findOne({ userName: req.decodedToken.userName }, function (err, user) {
//     let newTask = new Tasks({
//       name: req.body.name,
//       user: user,
//     });
//     /* If the operation errors send back an error msg if it succeeds send back the data*/
//     newTask.save(function (err, data) {
//       if (err) {
//         console.log(err);
//         res.status(500).send({ message: "An error occurred" });
//       } else {
//         res.send(data);
//       }
//     });
//   });
// };

/* Display all the menu items */
exports.displayAll = function (_, res) {
  Menu.find({}, function (err, menuItems) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "An error occurred." });
    } else {
      res.send(menuItems);
    }
  });
};

/* Find a task using the id created by MongoDB and delete it.*/
// exports.deleteTask = function (req, res) {
//   if (req.decodedToken.type !== "admin") {
//     res.status(401).send({ message: "Unauthorized action for user type" });
//   }
//   // Using the id to find the task and ensuring the user is allowed to delete the task by using the decodedToken
//   Tasks.findOneAndRemove(
//     { _id: req.body.id, user: req.decodedToken.userId },
//     function (err, result) {
//       // Error handling
//       if (err) {
//         console.log(err);
//         res.status(500).send({ message: "An error occurred." });
//       } else {
//         if (result) {
//           res.send({ msg: "Task deleted" });
//         } else {
//           res.status(400).send({ message: "Task not found" });
//         }
//       }
//     }
//   );
// };
