const assert = require("assert");
const request = require("supertest");
const app = require("../../app");

describe("Drivers controller", () => {
  it("Post to /api/drivers creates a new driver", async () => {
    const response = await request(app).post("/api/drivers").send({
      email: "test@test.com",
    });
  });
});
