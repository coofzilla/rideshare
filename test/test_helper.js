const mongoose = require("mongoose");
const keys = require("../config/dev");

before(async () => {
  await mongoose.connect(keys.mongoURI_test);
  mongoose.connection
    .once("open", () => console.log("TEST MODE! Good to go!"))
    .on("error", (error) => {
      console.warn("Warning", error);
    });
});

beforeEach(async () => {
  const { drivers } = mongoose.connection.collections;

  try {
    await drivers.drop();
    await drivers.createIndex({ "geometry.coordinates": "2dsphere" });
  } catch {}
});
