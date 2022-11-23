const request = require("supertest");
const app = require("../index");
jest.setTimeout(20000);
let random = Math.floor(Math.random() * 1000) + 1;
let username = `${random}user`;
let email = `${random}user@gmail.com`;
let password = `${random}password`;

describe("Testing routes and responses for REGISTER", () => {
  test("No or missing data", async () => {
    let data = {
      username: "",
      password: "",
      email: "",
    };

    await request(app)
      .post("/api/v1/register")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(422)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: "All fields are required" })
        );
      })
      .catch((err) => console.log(err));
  });

  test("Password too short", async () => {
    let data = {
      username: "anything",
      password: "123",
      email: "something@thatworks.com",
    };

    await request(app)
      .post("/api/v1/register")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(400)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({
            message: "Password must contain at least 6 characters",
          })
        );
      })
      .catch((err) => console.log(err));
  });

  test("Already registered user attempts to re-register", async () => {
    let data = {
      username: "medic111111",
      password: "$2b$10$o3rU6TRcDiWVckz67kSCZ.B5RHHiHXefmFR5fYmvcKLxtBUJY20ru",
      email: "Evelynn_Bullock1908@infotech44.tech",
    };

    await request(app)
      .post("/api/v1/register")
      .send(data)
      .expect(409)
      .expect("Content-Type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({
            message: "Username or Email already registered",
          })
        );
      })
      .catch((err) => console.log(err));
  });

  test("Successful registration", async () => {
    let data = {
      username,
      password,
      email,
    };

    await request(app)
      .post("/api/v1/register")
      .send(data)
      .expect(201)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ username: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ token: expect.any(String) })
        );
      })
      .catch((err) => console.log(err));
  });
});
