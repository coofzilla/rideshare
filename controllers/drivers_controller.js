//this logic "can" live in routes but refactored here for cleanliness
const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },

  async create(req, res) {
    const driverProps = req.body;
    const driver = await Driver.create(driverProps);
    res.send(driver);
  },
};
