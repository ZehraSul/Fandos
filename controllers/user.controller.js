const Users = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const request = require("request");
dotenv.config();

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
      res.send({ token: token, userType: data.type });
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
          res.send({ token: token, userType: record.type });
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

// For users to login by using Google account
exports.googleLogin = function (req, res) {
  const token = req.body.token;

  client
    .verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then(
      function (ticket) {
        const { email } = ticket.getPayload();

        // Using findOne we find the username in our MongoDB users collection
        Users.findOne({ emailAddress: email }, function (err, record) {
          // Error handling
          if (err) {
            console.log(err);
            res.status(500).send({ message: "An error occurred." });
            // If the user is not found, add them to the database
          } else if (!record) {
            let newUser = new Users({
              emailAddress: email,
              password: token,
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
                const token = jwt.sign(
                  JSON.stringify(payload),
                  process.env.SECRET,
                  {
                    algorithm: "HS256",
                  }
                );
                // Send back token
                res.send({ token: token, userType: data.type });
              }
            });
          } else {
            Users.findOneAndUpdate(
              { emailAddress: email },
              { password: token },
              { upsert: true },
              function (err, result) {
                // Error handling
                if (err) {
                  console.log(err);
                  res.status(500).send({ message: "An error occurred." });
                } else {
                  if (result) {
                    let payload = {
                      emailAddress: record.emailAddress,
                      userId: record._id,
                      type: record.type,
                    };
                    // Create token using payload data, secret key and algorithm type
                    const token = jwt.sign(
                      JSON.stringify(payload),
                      process.env.SECRET,
                      {
                        algorithm: "HS256",
                      }
                    );
                    // Send back token
                    res.send({ token: token, userType: record.type });
                  } else {
                    res.status(400).send({ message: "An error occurred" });
                  }
                }
              }
            );
          }
        });
      },
      function (error) {
        console.log(error);
        res.status(500).send({ message: error.toString() });
      }
    );
};

exports.facebookLogin = function (req, res) {
  const email = req.body.emailAddress;
  const accessToken = req.body.accessToken;
  request(
    {
      url: `https://graph.facebook.com/me?access_token=${accessToken}`,
    },
    (error, response, body) => {
      const bodyJson = JSON.parse(body);
      if (error || response.statusCode !== 200 || bodyJson.error) {
        return res
          .status(500)
          .json({ type: "error", message: error || bodyJson.error.message });
      }

      // Using findOne we find the username in our MongoDB users collection
      Users.findOne({ emailAddress: email }, function (err, record) {
        // Error handling
        if (err) {
          console.log(err);
          res.status(500).send({ message: "An error occurred." });
          // If the user is not found, add them to the database
        } else if (!record) {
          let newUser = new Users({
            emailAddress: email,
            password: accessToken,
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
              const token = jwt.sign(
                JSON.stringify(payload),
                process.env.SECRET,
                {
                  algorithm: "HS256",
                }
              );
              // Send back token
              res.send({ token: token, userType: data.type });
            }
          });
        } else {
          Users.findOneAndUpdate(
            { emailAddress: email },
            { password: accessToken },
            { upsert: true },
            function (err, result) {
              // Error handling
              if (err) {
                console.log(err);
                res.status(500).send({ message: "An error occurred." });
              } else {
                if (result) {
                  let payload = {
                    emailAddress: record.emailAddress,
                    userId: record._id,
                    type: record.type,
                  };
                  // Create token using payload data, secret key and algorithm type
                  const token = jwt.sign(
                    JSON.stringify(payload),
                    process.env.SECRET,
                    {
                      algorithm: "HS256",
                    }
                  );
                  // Send back token
                  res.send({ token: token, userType: record.type });
                } else {
                  res.status(400).send({ message: "An error occurred" });
                }
              }
            }
          );
        }
      });
    }
  );
};
