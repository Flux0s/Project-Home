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
var cookieParser = require("cookie-parser");
var MongoStore = require("express-mongoose-store")(expressSession, mongoose);

///////////////////////////////////////////////////////////////
//
///////////////////////////////////////////////////////////////
// Set up the Session middleware using a MongoDB session store
mongoose.connect(
  configDB.url,
  { useNewUrlParser: true }
); // connect to our database

// Initialize the mongodb session store
var mongo_store = new MongoStore({});

var sessionMiddleware = expressSession({
  secret: process.env.COOKIE_SECRET,
  cookie: {
    maxAge: process.env.COOKIE_EXPIRATION,
    secure: false,
    httpOnly: false
  },
  name: process.env.COOKIE_NAME,
  store: mongo_store,
  saveUninitialized: false,
  resave: false
  // rolling: true
});

require("./config/passport")(passport); // pass passport for configuration

// Set up the Express server
var app = require("express")()
  .use(bodyParser())
  .use(morgan("dev"))
  .use(sessionMiddleware)
  .use(passport.initialize())
  .use(passport.session())
  .get("/", (req, res, next) => {
    // console.log(req.user);
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.user) {
      res.status(404);
      res.send("cannot GET /");
    } else {
      res.status(401);
      res.send("The requested resource requires an authentication.");
    }
  })
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
  .use(sharedsession(sessionMiddleware, {}))
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
              socket.handshake.sessionID
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
  // .use(function(socket, next) {
  //   console.log("Initilizing middleware...");
  //   var req = socket.handshake;
  //   var res = {};

  //   // passport.initialize(req, res, next);
  //   // passport.session(req, res, next);
  //   // next();
  //   // cookieParser(req, res, function(err) {
  //   //   if (err) console.log(err);
  //   //   next();
  //   // });
  //   console.log("Post middleware setup");
  // })
  .on("connection", function(socket) {
    var userId = socket.handshake.session.passport.user;
    socket.emit("Authentication_Successful");
    socket.on("Log_Out", (cb) => {
      console.log("User ", socket.handshake.sessionID, " requested log out...");
      try {
        cb();
        socket.emit("disconnected");
        socket.handshake.session.destroy();
        // this.handshake.logout();
        console.log(socket);
        socket.disconnect();
        console.log(
          "User ",
          socket.handshake.sessionID,
          " logged out successfully..."
        );
      } catch (e) {
        console.log("Unable to log user out: ", e);
      }
    });
  });
