const helperFunctions = require("../helperFunctions/helperFunctions");
module.exports.dataValidator = function dataValidator(
  { data },
  timeOfRecievingData
) {
  // console.log("arrayOfValidatedObjects ", typeof data);
  console.log("date is ", timeOfRecievingData);
  let initVector = "5183666c72eec9e4";
  let secretKey = "bf3c199c2470cb477d907b1e0917c17b";
  let arrayOfEncryptedObjects = data.split("|");
  // console.log("array of encrypted obhects", arrayOfEncryptedObjects);
  let arrayOfDecryptedObjects = arrayOfEncryptedObjects.map((object) => {
    return helperFunctions.decryptData(object, initVector, secretKey);
  });
  let arrayOfValidatedObjects = arrayOfDecryptedObjects.filter(
    ({ secret_key, ...data }, index) => {
      //   if (index % 2 == 0) {
      //     secret_key = secret_key + "2";
      //     // console.log("secret key", secretKey);
      //   }
      let hashOfData = helperFunctions.createHash(data);
      return hashOfData === secret_key;
    }
  );
  // arrayOfDecryptedObjects.map(object);
  UpdatePersonModelInDataBase(arrayOfValidatedObjects, timeOfRecievingData);
  // console.log("arrayOfValidatedObjects ", arrayOfValidatedObjects);
  //   io.emit("send-data-to-frontend", arrayOfValidatedObjects);
};

// module.exports.UpdatePersonModelInDataBase =
async function UpdatePersonModelInDataBase(
  arrayOfValidatedObjects,
  timeOfRecievingData
) {
  arrayOfValidatedObjects.map(async (object) => {
    let timeObj = {
      name: object.name,
      origin: object.origin,
      destination: object.destination,
      timeStamp: timeOfRecievingData,
    };
    let timeFieldInPersonModel = new Date(timeOfRecievingData.getTime());
    timeFieldInPersonModel.setSeconds(0);
    timeFieldInPersonModel.setMilliseconds(0);
    console.log("name and time is", object.name, timeFieldInPersonModel);
    // find one by person document by name and time
    let newPerson = await Person.findOne({
      name: object.name,
      time: timeFieldInPersonModel,
    }).exec();

    //  if a person document already exist for corresponding user and time
    if (newPerson) {
      console.log("Person is Found !! ", newPerson.name);
      newPerson.stream.push(timeObj);
      await newPerson.save();
    } else {
      console.log("Person not Found !! ");
      let newPerson = await Person.create({
        name: object.name,
        time: timeFieldInPersonModel,
        stream: [timeObj],
      });
    }
  });
}
