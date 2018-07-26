require("dotenv").config();

var port = process.env.PORT || 5000;
var configDB = require("./config/database.js");
var morgan = require("morgan");
var passport = require("passport");
var expressSession = require("express-session");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var sharedsession = require("express-socket.io-session");
var User = require("./user");
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
  cookie: { maxAge: 1800000, secure: false, httpOnly: false },
  store: mongo_store,
  saveUninitialized: false,
  resave: true
});

require("./config/passport")(passport); // pass passport for configuration

// Set up the Express server
var app = require("express")()
  .use(bodyParser())
  .use(morgan("dev"))
  .use(sessionMiddleware)
  .use(passport.initialize())
  .use(passport.session())
  .post(
    "/",
    passport.authenticate("local-login", {
      successRedirect: true,
      failureRedirect: "/login" // redirect back to the login page if there is an error
    })
  )
  .listen({ host: "localhost", port: port });

console.log("Listening on " + port);

// Set up the Socket.IO server
var io = require("socket.io")(app)
  .use(sharedsession(sessionMiddleware, { autoSave: true }))
  .use(function(socket, next) {
    if (false) {
      console.log(
        "Authenticated " +
          socket.handshake.session.passport.user +
          " successfully!"
      );
      next();
    }
    console.log(
      "Warning! Unauthenticated socket request from ",
      User.findById(socket.handshake.session.passport.user) || "Unknown User",
      "! Killing the connection..."
    );
    socket.disconnect();
    return;
  })
  .on("connection", function(socket) {
    var userId = socket.handshake.session.passport.user;
    console.log(
      "Socket connection with ",
      userId,
      " established successfully: "
    );
  });
