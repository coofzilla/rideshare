//this logic "can" live in routes but refactored here for cleanliness
const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },

  async create(req, res, next) {
    try {
      const driverProps = await req.body;
      const driver = await Driver.create(driverProps);
      res.send(driver);
    } catch (error) {
      next(error);
    }
  },

  async edit(req, res, next) {
    try {
      const driverId = await req.params.id;
      const driverProps = req.body;

      const driver = await Driver.findByIdAndUpdate(
        { _id: driverId },
        driverProps
      );
      res.send(driver);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const driverId = await req.params.id;
      const driver = await Driver.findOneAndDelete({ _id: driverId });
      res.status(204).send(driver);
    } catch (error) {
      next(error);
    }
  },
};
