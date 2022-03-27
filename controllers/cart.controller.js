const Cart = require("../models/cart.model.js");
const Users = require("../models/user.model.js");

/* Add new items to cart, pass in object with the data from the user inputs.*/
exports.create = function (req, res) {
  Users.findOne({ _id: req.decodedToken.userId }, function (err, user) {
    console.log(user, req.decodedToken.userId);
    let newCart = new Cart({
      user: user,
      items: req.body.items,
    });
    newCart.save(function (err, data) {
      console.log(data);
      if (err) {
        console.log(err);
        res.status(500).send({ message: "An error has occurred" });
      } else {
        Cart.findOne({ _id: data._id })
          .populate("items")
          .exec(function (err, cart) {
            if (err) {
              console.log(err);
              res.status(500).send({ message: "An error occurred" });
            } else {
              res.send(cart);
            }
          });
      }
    });
  });
};

/* Display all the items in cart */
exports.displayAll = function (req, res) {
  Cart.findOne({ user: req.decodedToken.userId })
    .populate("items")
    .exec(function (err, cartItems) {
      console.log(cartItems);
      if (err) {
        console.log(err);
        res.status(500).send({ message: "An error occurred." });
      } else {
        res.send(cartItems);
      }
    });
};

/* Find a task using the id created by MongoDB and delete it.*/
exports.clearCart = function (req, res) {
  // Using the id to find the task and ensuring the user is allowed to delete the task by using the decodedToken
  Cart.findOneAndUpdate(
    { user: req.decodedToken.userId },
    { items: [] },
    { upsert: true, returnOriginal: false },
    function (err, result) {
      // Error handling
      if (err) {
        console.log(err);
        res.status(500).send({ message: "An error occurred." });
      } else {
        if (result) {
          res.send(result);
        } else {
          res.status(400).send({ message: "Cart not found" });
        }
      }
    }
  );
};

exports.addToCart = function (req, res) {
  Cart.findOne({ user: req.decodedToken.userId })
    .populate("items")
    .exec(function (err, cart) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "An error occurred." });
      } else {
        Cart.findOneAndUpdate(
          { user: req.decodedToken.userId },
          { items: [...cart.items, req.body.item] },
          { upsert: true, returnOriginal: false }
        )
          .populate("items")
          .exec(function (err, data) {
            if (err) {
              console.log(err);
              res.status(500).send({ message: "An error occurred." });
            } else {
              res.send(data);
            }
          });
      }
    });
};

exports.removeFromCart = function (req, res) {
  Cart.findOne({ user: req.decodedToken.userId }, function (err, cart) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "An error occurred." });
    } else {
      Cart.findOneAndUpdate(
        { user: req.decodedToken.userId },
        {
          items: cart.items.filter(
            (_, index) =>
              index !==
              cart.items.findIndex(
                (i) => i._id.toString() === req.body.item._id
              )
          ),
        },
        { upsert: true, returnOriginal: false }
      )
        .populate("items")
        .exec(function (err, data) {
          if (err) {
            console.log(err);
            res.status(500).send({ message: "An error occurred." });
          } else {
            res.send(data);
          }
        });
    }
  });
};
