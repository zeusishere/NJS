const express = require("express");
const app = express();
let port = 5000;
app.set("view engine", "ejs");
app.set("views", "./public");
app.use(express.static("./public"));
app.get("/", (req, res) => {
  return res.render("index");
});

app.listen(port, (err) => {
  if (err) {
    console.log("there was an error starting express server ", err);
    return;
  }
  console.log("Server is running on port = ", port);
});
