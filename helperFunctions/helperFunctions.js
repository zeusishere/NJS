const { algorithm, initVector, secretKey } = require("../resources/constants");
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
/*returns an array created by selecting elements at random
arr = [
 { 
     name:<value>,
     origin:<value> . 
     destination:<value>
 }
] */
let createArrayOfObjects = () => {
  let numberOfObjectsToBeSent = getRandomNumberBetween49And499();
  let arrayOfObjects = [];
  for (let i = 0; i < numberOfObjectsToBeSent; i++) {
    let objectCreatedAtRandom = {
      name: getAnElementAtRandomFromPassedArray(data.names),
      origin: getAnElementAtRandomFromPassedArray(data.cities),
      destination: getAnElementAtRandomFromPassedArray(data.cities),
    };
    arrayOfObjects.push(objectCreatedAtRandom);
  }
  return arrayOfObjects;
};
//  creates a hash object passed as parameter
let createHash = (object) => {
  let objectString = JSON.stringify(object);
  let hashedObject = crypto.createHash("sha256").update(objectString);
  return hashedObject.digest("hex");
};
// returns an encrypted  object using initVector , securityKey , all being passed as parameters
let encryptData = (object, initVector, securityKey) => {
  let text = JSON.stringify(object);
  const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);
  let encryptedText = cipher.update(text, "utf8", "hex");
  //
  encryptedText += cipher.final("hex");
  return encryptedText;
};
let generateArrayOfHashedAndEncryptedObjectsFromInputArray = (arr) => {
  let i = 0;
  //   to be replaced by env keys later
  let arrayOFHashedAndEncryptedObjects = [];
  arrayOFHashedAndEncryptedObjects = arr.map((object) => {
    let hashedObject = { ...object, secret_key: createHash(object) };
    let encryptedObject = encryptData(hashedObject, initVector, secretKey);
    return encryptedObject;
  });
  return arrayOFHashedAndEncryptedObjects;
};
// decryption helper fn to work with NJS-Listener
// decrypts an encrypted message using encrypted text , initialization vector and security keys
let decryptData = (encryptedText, initVector, securityKey) => {
  const decipher = crypto.createDecipheriv(algorithm, securityKey, initVector);
  let decryptedData = decipher.update(encryptedText, "hex", "utf-8");
  decryptData += decipher.final("utf-8");
  return JSON.parse(decryptedData);
};
module.exports = {
  createHash,
  encryptData,
  decryptData,
  createArrayOfObjects,
  generateArrayOfHashedAndEncryptedObjectsFromInputArray,
};
