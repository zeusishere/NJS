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
