const app = require("../app");
const request = require("supertest");

describe("GET /api/books", () => {
  it("responds with 200", async () => {
    await request(app).get("/api/books").expect(200);
  });

  //   it("return correct json response", async () => {
  //     const response = await request(app).get("/api/test");

  //     expect(response.body.message).toBe("test message");
  //   });
});
