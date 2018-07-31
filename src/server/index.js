require("dotenv").config();

var port = process.env.PORT || 5000;
var configDB = require("./config/db/database");
var morgan = require("morgan");
var passport = require("passport");
var expressSession = require("express-session");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var sharedsession = require("express-socket.io-session");
var User = require("./config/db/schemas/user");
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
      successRedirect: "/config",
      failureRedirect: "/login" // redirect back to the login page if there is an error
    })
  )
  .listen({ host: "localhost", port: port });

console.log("Listening on " + port);

// Set up the Socket.IO server
var io = require("socket.io")(app)
  .use(sharedsession(sessionMiddleware, { autoSave: true }))
  .use(function(socket, next) {
    if (!socket.handshake.session.passport) {
      console.log(
        "#### Warning: Intercepted unauthenticated socket request! Disconnecting..."
      );
      socket.disconnect();
    } else
      User.findById(socket.handshake.session.passport.user, (err, user) => {
        if (user) {
          console.log(
            "Authenticated socket connection from known user: " +
              socket.handshake.session.passport.user
          );
          next();
        } else {
          console.log(
            "#### Warning: Intercepted socket request with unknown user! Disconnecting..."
          );
          socket.disconnect();
        }
      });
  })
  .on("connection", function(socket) {
    var userId = socket.handshake.session.passport.user;
    socket.emit("Authentication_Successful");
    socket.on("Log_Out", () => {
      console.log("User requested logout.");
    });
  });
