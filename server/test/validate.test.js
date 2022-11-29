const request = require("supertest");
const app = require("../index");
jest.setTimeout(20000);

describe("Testing route for token validation", () => {
  test.skip("It successfully validates a GOOD token", async () => {
    await request(app)
      .get("/api/v1/validate")
      .set({
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlleW90ZWVmIiwiaWF0IjoxNjY4ODI3NDk4LCJleHAiOjE2Njg4MjgwOTh9.QYM7uAXumKTjRTK8kowuOo4J7v4tWrqx36OuSaoQcLs",
      })
      .set("Accept", "application/json")
      .expect(200)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: "Valid Token" })
        );
      })
      .catch((err) => console.log(err));
  });

  test("It does not validates a BAD token", async () => {
    await request(app)
      .get("/api/v1/validate")
      .set({
        Authorization:
          "eyJhbGciOiJIUz5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlleW90ZWVmIiwiaWF0IjoxNjY4ODI3NDk4LCJleHAiOjE2Njg4MjgwOTh9.QYM7uAXumKTjRTK8kowuOo4J7v4tWrqx36OuSaoQcLs",
      })
      .set("Accept", "application/json")
      .expect(401)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: "Invalid/Expired Token" })
        );
      })
      .catch((err) => console.log(err));
  });
});
