// config/database.js
module.exports = {
  url:
    process.env.MONGODB_URI ||
    "mongodb://heroku_qzjtw3wl:k4hmpkgg0fi8uk4o4g7msbl243@ds141611.mlab.com:41611/heroku_qzjtw3wl" // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
};
