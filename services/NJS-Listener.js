const db = require("../configs/mongoose");
const Person = require("../models/Person");
const personController = require("../controller/person");
const helperFunctions = require("../helperFunctions/helperFunctions");
const http = require("http");
const port = 3000;
const server = http.createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5000",
  },
});

io.on("connection", (socket) => {
  console.log("A socket connected", socket.id);
  socket.on("message", (data) => {
    console.log(data);
  });
  socket.on("send-encrypted-data", (data) => {
    let timeOfRecievingData = new Date();
    let arrayOfValidatedObjects = personController.dataValidator(
      data,
      timeOfRecievingData
    );
    //   sends data to web-app for displaying purpose .
    socket.broadcast.emit("send-data-to-frontend", {
      arrayOfValidatedObjects,
      timeOfRecievingData,
    });
  });
});

server.listen(port);
