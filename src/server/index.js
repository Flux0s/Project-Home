// server.js

// set up ======================================================================
// get all the tools we need
require("dotenv").config();
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");

var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");

var configDB = require("./config/database.js");

// configuration ===============================================================
mongoose.connect(
  configDB.url,
  { useNewUrlParser: true }
); // connect to our database

require("./config/passport")(passport); // pass passport for configuration

// set up our express application
app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// app.set("view engine", "ejs"); // set up ejs for templating

// required for passport
var hour = 1800000;

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    cookie: { maxAge: hour }
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
// require("./app/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport

// process the signup form
app.post(
  "/",
  passport.authenticate("local-login", {
    successRedirect: "/configuration", // redirect to the secure profile section
    failureRedirect: "/", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  })
);

app.get("/getTheme", function (req, res) {
  if (!req.isAuthenticated())
    return (res.redirect("/"))   
});

// launch ======================================================================
app.listen(port, "localhost");
console.log("The magic happens on port " + port);
