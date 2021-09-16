const express = require("express");
const routes = require("./routes/routes");
const app = express();

//this is the new bodyparser
app.use(express.json());
routes(app);

module.exports = app;
