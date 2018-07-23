// Set up the Session middleware using a MongoDB session store
expressSession = require("express-session");
var sessionMiddleware = expressSession({
  name: "COOKIE_NAME_HERE",
  secret: "COOKIE_SECRET_HERE",
  store: new (require("connect-mongo")(expressSession))({
    url: "mongodb://localhost/DATABASE_NAME_HERE"
  })
});

// Set up the Express server
var app = require("express")()
  .use(sessionMiddleware)
  .use(passport.initialize())
  .use(passport.session())
  // ... more middleware ...
  .listen(8000);

// Set up the Socket.IO server
var io = require("socket.io")(app)
  .use(function (socket, next) {
    // Wrap the express middleware
    sessionMiddleware(socket.request, {}, next);
  })
  .on("connection", function (socket) {
    var userId = socket.request.session.passport.user;
    console.log("Your User ID is", userId);
  });