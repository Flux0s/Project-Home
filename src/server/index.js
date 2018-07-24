require("dotenv").config();

var port = process.env.PORT || 5000;
var configDB = require("./config/database.js");
var morgan = require("morgan");
var passport = require("passport");
var expressSession = require("express-session");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var MongoStore = require("connect-mongo")(expressSession);

///////////////////////////////////////////////////////////////
//
///////////////////////////////////////////////////////////////
// Set up the Session middleware using a MongoDB session store
mongoose.connect(
  configDB.url,
  { useNewUrlParser: true }
); // connect to our database

// Initialize the mongodb session store
var mongo_store = new MongoStore({
  mongooseConnection: mongoose.connection
});

var sessionMiddleware = expressSession({
  secret: process.env.COOKIE_SECRET,
  cookie: { maxAge: process.env.COOKIE_EXPIRATION, secure: false },
  store: mongo_store,
  saveUninitialized: false,
  resave: true
});

require("./config/passport")(passport); // pass passport for configuration

// Set up the Express server
var app = require("express")()
  .use(bodyParser())
  .use(morgan("dev"))
  .use(flash()) // use connect-flash for flash messages stored in session
  .use(sessionMiddleware)
  .use(passport.initialize())
  .use(passport.session())
  .post(
    "/",
    passport.authenticate("local-login", {
      // successRedirect: "/config", // redirect to the secure config section
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
