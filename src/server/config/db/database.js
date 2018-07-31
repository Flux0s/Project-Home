// config/database.js
module.exports = {
  url:
    process.env.MONGODB_URI ||
    "mongodb://" +
      process.env.DB_USER +
      ":" +
      process.env.DB_PASSWORD +
      "@" +
      process.env.DB_HOST +
      "/" +
      process.env.DB_NAME // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
};
