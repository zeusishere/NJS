const mongoose = require("mongoose");
// connecting to mongodb db
mongoose.connect("<connectionString>");
// acquire the connection to db
const db = mongoose.connection;
// registering handlers on the connnection
db.on(
  "error",
  console.error.bind(console, "connection error :cannot connect to the db")
);
db.once("open", () =>
  console.log("successfully connected to mongodb database")
);
module.exports = db;
