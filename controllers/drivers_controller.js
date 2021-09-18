//this logic "can" live in routes but refactored here for cleanliness
const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },

  async index(req, res, next) {
    try {
      const { lng, lat } = await req.query;
      const drivers = await Driver.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [parseFloat(lng), parseFloat(lat)],
            },
            distanceField: "dist.calculated",
            maxDistance: 200000,
            spherical: true,
          },
        },
      ]);

      res.send(drivers);
    } catch (e) {
      console.log(e);
    }
  },

  // async index(req, res, next) {
  //   const { lng, lat } = await req.query;
  //   const drivers = Driver.aggregate([
  //     {
  //       $geoNear: {
  //         near: {
  //           type: "Point",
  //           coordinates: [parseFloat(lng), parseFloat(lat)],
  //         },
  //         distanceField: "dist.calculated",
  //         maxDistance: 200000,
  //         spherical: true,
  //       },
  //     },
  //   ]);
  //   res.send(drivers);
  // },

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
