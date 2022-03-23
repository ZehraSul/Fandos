const Orders = require("../models/order.model.js");
const Users = require("../models/user.model.js");

// /* Add new task to database, pass in object with the data from the user inputs.*/
// exports.create = function (req, res) {
//   Users.findOne(
//     { emailAddress: req.decodedToken.emailAddress },
//     function (err, user) {
//       let newTask = new Tasks({
//         name: req.body.name,
//         user: user,
//       });
//       /* If the operation errors send back an error msg if it succeeds send back the data*/
//       newTask.save(function (err, data) {
//         if (err) {
//           console.log(err);
//           res.status(500).send({ message: "An error occurred" });
//         } else {
//           res.send(data);
//         }
//       });
//     }
//   );
// };

/* Display all the orders */
exports.displayAll = function (req, res) {
  Orders.find({ user: req.decodedToken.userId })
    .populate("items")
    .exec(function (err, orders) {
      console.log(orders);
      if (err) {
        console.log(err);
        res.status(500).send({ message: "An error occurred." });
      } else {
        res.send(orders);
      }
    });
};

// /* Find a task using the id created by MongoDB and delete it.*/
// exports.deleteTask = function (req, res) {
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
