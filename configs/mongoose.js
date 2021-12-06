const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://shubham:2424554@cluster0.w9vzk.mongodb.net/node_auth?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "connection error :cannot connect to the db")
);
db.once("open", () =>
  console.log("successfully connected to mongodb database")
);
module.exports = db;
