require("dotenv").config();

var port = process.env.PORT || 5000;
var configDB = require("./config/database.js");
var morgan = require("morgan");
var passport = require("passport");
var expressSession = require("express-session");
var mongoose = require("mongoose");
var MongoStore = require("connect-mongo")(expressSession);

// Set up the Session middleware using a MongoDB session store

mongoose.connect(
  configDB.url,
  { useNewUrlParser: true }
); // connect to our database

var mongo_store = new MongoStore({
  mongooseConnection: mongoose.connection
});

var sessionMiddleware = expressSession({
  secret: process.env.COOKIE_SECRET,
  cookie: { maxAge: process.env.COOKIE_EXPIRATION, secure: false },
  store: mongo_store,
  saveUninitialized: false,
  rolling: true,
  resave: true
});

// Set up the Express server
var app = require("express")()

  .use(morgan("dev"))
  .use(passport.initialize())
  .use(passport.session())
  .use(sessionMiddleware)

  .post(
    "/",
    passport.authenticate("local-login", {
      successRedirect: "/config", // redirect to the secure profile section
      failureRedirect: "/", // redirect back to the login page if there is an error
      failureFlash: true // allow flash messages
    })
  )

  .listen({ host: "localhost", port: port });

console.log("Listening on " + port);

// Set up the Socket.IO server
var io = require("socket.io")(app)
  .use(function(socket, next) {
    // Wrap the express middleware
    sessionMiddleware(socket.request, {}, next);
  })
  .on("connection", function(socket) {
    var userId = socket.request.session.passport.user;
    console.log("Your User ID is", userId);
  });
