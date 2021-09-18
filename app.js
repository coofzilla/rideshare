const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/dev");
const routes = require("./routes/routes");
const app = express();

if (process.env.NODE_ENV !== "test") {
  mongoose.connect(keys.mongoURI);
}
mongoose.connection
  .once("open", () => console.log("PROD MODE Good to go!"))
  .on("error", (error) => {
    console.warn("Warning", error);
  });

//this is the new bodyparser
app.use(express.json());
routes(app);

app.use((err, req, res, next) => {
  console.log(err);
});

module.exports = app;
