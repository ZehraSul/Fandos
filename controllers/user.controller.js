const Users = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

exports.register = function (req, res) {
  const emailAddress = req.body.emailAddress;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (!(emailAddress && password && confirmPassword)) {
    let msg = "Required fields not populated";
    console.log(msg);
    res.status(400).send({ message: msg });
  }

  // TODO: Validate email

  Users.findOne({ emailAddress: emailAddress }, function (err, record) {
    // Error handling
    if (err) {
      console.log(err);
      res.status(500).send({ message: "An error occurred." });
      // If the email address exists, we cannot create a new user with the same one
    } else if (record) {
      let msg = "Email address already in use.";
      console.log(msg);
      res.status(400).send({ message: msg });
    }
  });

  if (password !== confirmPassword) {
    let msg = "Passwords do not match";
    console.log(msg);
    res.status(400).send({ message: msg });
  }

  let newUser = new Users({
    emailAddress: emailAddress,
    password: bcrypt.hashSync(password, 10),
  });

  /* If the operation errors send back an error msg if it succeeds send back a token */
  newUser.save(function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "An error occurred" });
    } else {
      let payload = {
        emailAddress: data.emailAddress,
        userId: data._id,
        type: data.type,
      };
      // Create token using payload data, secret key and algorithm type
      const token = jwt.sign(JSON.stringify(payload), process.env.SECRET, {
        algorithm: "HS256",
      });
      // Send back token
      res.send({ token: token });
    }
  });
};

// For users to login by taking in a username and password
exports.login = function (req, res) {
  const emailAddress = req.body.emailAddress;
  const password = req.body.password;

  // Using findOne we find the username in our MongoDB users collection
  Users.findOne({ emailAddress: emailAddress }, function (err, record) {
    // Error handling
    if (err) {
      console.log(err);
      res.status(500).send({ message: "An error occurred." });
      // If the user is found use bcrypt to compare the endcrypted user's password stored in the users collection to the password in the input field
    } else if (record) {
      bcrypt.compare(password, record.password, function (err, validPassword) {
        // Error handling
        if (err) {
          console.log(err);
          res.status(500).send({ message: "An error occurred." });
          // If the password is valid, add emailAddress and id to the "payload" for making a jwt
        } else if (validPassword) {
          let payload = {
            emailAddress: record.emailAddress,
            userId: record._id,
            type: record.type,
          };
          // Create token using payload data, secret key and algorithm type
          const token = jwt.sign(JSON.stringify(payload), process.env.SECRET, {
            algorithm: "HS256",
          });
          // Send back token
          res.send({ token: token });
        } else {
          // Error handling
          res.status(403).send({ message: "Invalid password!" });
        }
      });
    } else {
      res.status(403).send({ message: "Incorrect email address!" });
    }
  });
};
