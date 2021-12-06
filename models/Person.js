const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: Date, required: true },
  stream: [
    {
      name: { type: String, required: true },
      origin: { type: String, required: true },
      destination: { type: String, required: true },
      timeStamp: { type: Date },
    },
  ],
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
