const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/dev");
const routes = require("./routes/routes");
const app = express();

mongoose.connect(keys.mongoURI);

mongoose.connection
  .once("open", () => console.log("Good to go!"))
  .on("error", (error) => {
    console.warn("Warning", error);
  });

//this is the new bodyparser
app.use(express.json());
routes(app);

module.exports = app;
