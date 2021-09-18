const assert = require("assert");
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");

const Driver = mongoose.model("driver");

describe("Drivers controller", () => {
  it("Post to /api/drivers creates a new driver", async () => {
    const count = await Driver.countDocuments();
    await request(app).post("/api/drivers").send({
      email: "test@test.com",
    });
    const newCount = await Driver.countDocuments();
    assert(count + 1 === newCount);
  });

  it("PUT to /api/drivers/id edits an existing driver", async () => {
    const driver = await new Driver({ email: "test@put.com", driving: false });
    await driver.save();
    await request(app).put(`/api/drivers/${driver._id}`).send({
      driving: true,
    });
    const driverUpdated = await Driver.findOne({ email: "test@put.com" });
    assert(driverUpdated.driving === true);
  });

  it("DELETE /api/drivers/id can delete a driver", async () => {
    const driver = await new Driver({ email: "test@delete.com" });
    await driver.save();
    await request(app).delete(`/api/drivers/${driver._id}`);
    const deletedDriver = await Driver.findOne({ email: "test@delete.com" });
    assert(deletedDriver === null);
  });

  it("GET to /api/drivers finds drivers in a location", async () => {
    const seattleDriver = await new Driver({
      email: "seattle@test.com",
      geometry: { type: "Point", coordinates: [-122, 47] },
    });
    const miamiDriver = await new Driver({
      email: "miami@test.com",
      geometry: { type: "Point", coordinates: [-80.253, 25.791] },
    });

    await seattleDriver.save();
    await miamiDriver.save();
    const response = await request(app).get("/api/drivers?lng=-80&lat=25");

    assert(response.body.length === 1);

    assert(response.body[0].email === "miami@test.com");
  });
});
