const helperFunctions = require("../helperFunctions/helperFunctions");
const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");
socket.on("connect", function (socket) {
  console.log("successfully Connected to the server!");
});
socket.on("connect_failed", function () {
  console.log("Sorry, there seems to be an issue with the connection!");
});
socket.on("disconnect", function (socket) {
  console.log("successfully Connected to the server!");
});
let setIntervalId = setInterval(() => {
  socket.emit("send-encrypted-data", { data: sendDataToClient() });
}, 10000);
// send encrypted data to NJS-Listener
function sendDataToClient() {
  // get an array of objects containing random key:value pairs for Person name , origin, destination
  let arrayOfOriginalData = helperFunctions.createArrayOfObjects();
  // get array of encrypted and hashed objects from arrayOfOriginalData
  let arrayOFHashedAndEncryptedObjects =
    helperFunctions.generateArrayOfHashedAndEncryptedObjectsFromInputArray(
      arrayOfOriginalData
    );
  return arrayOFHashedAndEncryptedObjects.join("|");
}
