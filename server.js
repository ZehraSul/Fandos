var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
var helmet = require("helmet");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

//Require moongoose
var mongoose = require("mongoose");
const { Verify } = require("crypto");

var app = express();
dotenv.config();

// Security
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  cors({
    origin: "*",
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Middleware
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("./routes/user/login.js")(app);
require("./routes/user/register.js")(app);

// Verifying user input of User name and Password from login page
app.use(function (req, res, next) {
  const auth = req.headers["authorization"];

  if (!auth) {
    res.status(401).send({ err: "Missing Auth Header!" });
    return;
  }

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.decodedToken = decoded;
    next();
  } catch (err) {
    res.status(401).send({ err: "Bad JWT!" });
  }
});

// Routes
require("./routes/menu/displayAll.js")(app);
require("./routes/menu/create.js")(app);
require("./routes/menu/delete.js")(app);

require("./routes/orders/displayAll.js")(app);
require("./routes/orders/create.js")(app);

require("./routes/cart/create.js")(app);
require("./routes/cart/displayAll.js")(app);
require("./routes/cart/clear.js")(app);
require("./routes/cart/addToCart.js")(app);
require("./routes/cart/removeFromCart.js")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// To connect to MongoDB. I have added the .env in the files for the mentor to see but I have also added it to .gitignore so it will be skipped when uploading to github
mongoose.connect(process.env.URI);

// Error handling for connection to MongoDB
mongoose.connection.on("error", function (e) {
  console.log("Connection to Mongo failed.", e);
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

// Msg for successfully connection
mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});

// Allows me to deploy backend and frontend as one project with Heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "fandos/build")));
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "fandos", "build", "index.html"));
  });
}

// listening on port 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
