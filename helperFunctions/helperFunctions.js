const algorithm = "aes-256-ctr";
const data = require("../resources/data");
const crypto = require("crypto");
let getRandomNumberBetween49And499 = () => {
  return Math.floor(Math.random() * 451 + 49);
};
let getAnElementAtRandomFromPassedArray = (arr) => {
  let sizeOfArray = arr.length;
  let indexSelectedAtRandom = Math.floor(
    Math.random(sizeOfArray) * sizeOfArray
  );
  return arr[indexSelectedAtRandom];
};
let createArrayOfObjects = () => {
  let numberOfObjectsToBeSent = getRandomNumberBetween49And499();
  console.log("numberOfObjectsToBeSent ", numberOfObjectsToBeSent);
  let arrayOfObjects = [];
  for (let i = 0; i < 3; i++) {
    //numberOfObjectsToBeSent
    let objectCreatedAtRandom = {
      // name: getAnElementAtRandomFromPassedArray(data.names),
      // origin: getAnElementAtRandomFromPassedArray(data.cities),
      // destination: getAnElementAtRandomFromPassedArray(data.cities),
      name: data.names[i],
      origin: data.cities[i],
      destination: data.cities[i],
    };
    arrayOfObjects.push(objectCreatedAtRandom);
  }
  return arrayOfObjects;
};
let createHash = (object) => {
  let objectString = JSON.stringify(object);
  let hashedObject = crypto.createHash("sha256").update(objectString);
  return hashedObject.digest("hex");
};
let encryptData = (object, initVector, securityKey) => {
  let text = JSON.stringify(object);
  const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);
  let encryptedText = cipher.update(text, "utf8", "hex");
  //
  encryptedText += cipher.final("hex");
  //   console.log("Encrypted message: " + encryptedText);
  return encryptedText;
};
let generateArrayOfHashedAndEncryptedObjectsFromInputArray = (arr) => {
  let i = 0;
  //   to be replaced by env keys later
  let initVector = "5183666c72eec9e4";
  let secretKey = "bf3c199c2470cb477d907b1e0917c17b";
  let arrayOFHashedAndEncryptedObjects = [];
  arrayOFHashedAndEncryptedObjects = arr.map((object) => {
    let hashedObject = { ...object, secret_key: createHash(object) };
    let encryptedObject = encryptData(hashedObject, initVector, secretKey);
    return encryptedObject;
  });
  console.log("encryptedArrayis @@@@ ", arrayOFHashedAndEncryptedObjects);
  return arrayOFHashedAndEncryptedObjects;
};
// decryption helper fn to work with NJS-Listener
let decryptData = (encryptedText, initVector, securityKey) => {
  const decipher = crypto.createDecipheriv(algorithm, securityKey, initVector);
  let decryptedData = decipher.update(encryptedText, "hex", "utf-8");
  decryptData += decipher.final("utf-8");
  //   console.log("Decrypted message: " + decryptedData);
  return JSON.parse(decryptedData);
};
module.exports = {
  createHash,
  encryptData,
  decryptData,
  createArrayOfObjects,
  generateArrayOfHashedAndEncryptedObjectsFromInputArray,
};
