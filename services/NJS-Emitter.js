const helperFunctions = require("../helperFunctions/helperFunctions");
// socket.io code below
const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");
// socket.on("connect", function (socket) {
//   console.log("Connected!");
// });
socket.emit("connected", { message: "a new client connected" });
let setIntervalId = setInterval(() => {
  socket.emit("send-encrypted-data", { data: sendDataToClient() });
}, 10000);
// socket.emit("send-encrypted-data", { data: sendDataToClient() });
// socket code ends
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

  // console.log(res);
  //   let obj = { name: "shubham", origin: "agra", destination: "lucknow" };
  //   let hashOfObj = helperFunctions.createHash(obj);
  //   console.log("hash is ", hashOfObj);
  //   let updatedObj = { ...obj, secret_key: hashOfObj };
  //   console.log("updatedObj is", updatedObj);
  //   const initVector = require("crypto")
  //     .randomBytes(16)
  //     .toString("hex")
  //     .slice(0, 16);
  //   const securityKey = require("crypto")
  //     .randomBytes(32)
  //     .toString("hex")
  //     .slice(0, 32);
  //   let encObj = helperFunctions.encryptData(updatedObj, initVector, securityKey);
  //   console.log("encrypted Obj is", encObj);
  //   let decObj = helperFunctions.decryptData(encObj, initVector, securityKey);
  //   console.log("decrypted Obj is", decObj);
}
