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
});