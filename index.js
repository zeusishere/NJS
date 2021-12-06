const express = require("express");
const app = express();
let port = 5000;
app.get("/", (req, res) => {
  return res.send("hi");
});

app.listen(port, (err) => {
  if (err) {
    console.log("there was an error starting express server ", err);
    return;
  }
  console.log("Server is running on port = ", port);
});
