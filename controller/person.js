const Person = require("../models/Person");
const helperFunctions = require("../helperFunctions/helperFunctions");
// validates data objects recieved by NJS-Listener
module.exports.dataValidator = function dataValidator(
  { data },
  timeOfRecievingData
) {
  let initVector = "5183666c72eec9e4";
  let secretKey = "bf3c199c2470cb477d907b1e0917c17b";
  //   breaks string into individual encrypted objects
  let arrayOfEncryptedObjects = data.split("|");
  //   decrypts objects inside array
  let arrayOfDecryptedObjects = arrayOfEncryptedObjects.map((object) => {
    return helperFunctions.decryptData(object, initVector, secretKey);
  });
  //   validates objects comparing secret_key with hash of remaining information inside object
  let arrayOfValidatedObjects = arrayOfDecryptedObjects.filter(
    ({ secret_key, ...data }, index) => {
      let hashOfData = helperFunctions.createHash(data);
      return hashOfData === secret_key;
    }
  );
  //   populate the database with successfully validated objects
  UpdatePersonModelInDataBase(arrayOfValidatedObjects, timeOfRecievingData);
  return arrayOfValidatedObjects;
};

async function UpdatePersonModelInDataBase(
  arrayOfValidatedObjects,
  timeOfRecievingData
) {
  try {
    arrayOfValidatedObjects.map(async (object) => {
      // object to be saved as part of stream
      let newStreamObj = {
        name: object.name,
        origin: object.origin,
        destination: object.destination,
        timeStamp: timeOfRecievingData,
      };
      //   to get value of time field to query in Person model
      let timeFieldInPersonModel = new Date(timeOfRecievingData.getTime());
      timeFieldInPersonModel.setSeconds(0);
      timeFieldInPersonModel.setMilliseconds(0);
      // find one  person document by using person name and time at which object was recieved in NJS-Listener
      let newPerson = await Person.findOne({
        name: object.name,
        time: timeFieldInPersonModel,
      }).exec();

      //  if a Person document already exists for corresponding user and time ,push newStreamObj to it
      if (newPerson) {
        newPerson.stream.push(newStreamObj);
        await newPerson.save();
        // otherwise create a new Person object
      } else {
        let newPerson = await Person.create({
          name: object.name,
          time: timeFieldInPersonModel,
          stream: [newStreamObj],
        });
      }
    });
  } catch (err) {
    console.log("an error occured while populating database . error is ", err);
  }
}
