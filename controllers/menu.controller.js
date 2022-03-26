const Menu = require("../models/menu.model.js");

/* Add new Menu item to database, pass in object with the data from the TODO Admin user inputs.*/
exports.create = function (req, res) {
  if (req.decodedToken.type !== "admin") {
    res.status(401).send({ message: "Unauthorized action for user type" });
    return;
  }
  let newMenuItem = new Menu({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageName: req.body.imageName,
  });
  /* If the operation errors send back an error msg if it succeeds send back the data*/
  newMenuItem.save(function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "An error occurred" });
    } else {
      res.send(data);
    }
  });
};

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
exports.delete = function (req, res) {
  if (req.decodedToken.type !== "admin") {
    res.status(401).send({ message: "Unauthorized action for user type" });
    return;
  }
  // Using the id to find the task and ensuring the user is allowed to delete the task by using the decodedToken
  Menu.findOneAndRemove({ _id: req.body.id }, function (err, result) {
    // Error handling
    if (err) {
      console.log(err);
      res.status(500).send({ message: "An error occurred." });
    } else {
      if (result) {
        res.send({ msg: "Menu Item deleted" });
      } else {
        res.status(400).send({ message: "Menu item not found" });
      }
    }
  });
};
