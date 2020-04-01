const supertest = require("supertest");
const server = require("../../api/server");
const db = require("../../data/dbConfig");

describe("hobbit middleware (hobbitMW)", () => {
  beforeEach(async () => {
    await db("hobbits").truncate();
  });

  afterAll(async () => {
    await db("hobbits").truncate();
  });

  it("returns 400 status code for missing hobbit name", () => {
    return supertest(server)
      .post("/api/hobbits")
      .send({})
      .then(res => {
        expect(res.status).toEqual(400);
      });
  });

  it("returns missing name error message", () => {
    return supertest(server)
      .post("/api/hobbits")
      .send({})
      .then(res => {
        expect(res.body.error).toBe("missing name for the hobbit");
      });
  });

  it("detects unknown fields and responds with status 400", () => {
    return supertest(server)
      .post("/api/hobbits")
      .send({ name: "frodo", age: 24 })
      .then(res => {
        expect(res.status).toEqual(400);
      });
  });

  it("identifies the unknown field(s) present", () => {
    return supertest(server)
      .post("/api/hobbits")
      .send({ name: "frodo", age: 24, role: "ring bearer" })
      .then(res => {
        expect(res.body.error.indexOf("age") >= 0).toBeTruthy();
        expect(res.body.error.indexOf("role") >= 0).toBeTruthy();
      });
  });

  it("validates bulk creation", async () => {
    const hobbits = [
      { name: "frodo", roles: "ring keeper", height: "4ft" },
      { name: "sam", age: 25 },
      { names: "pippin" }
    ];
    await supertest(server)
      .post("/api/hobbits")
      .send(hobbits)
      .then(res => {
        expect(res.body).toHaveProperty("error", [
          "hobbit frodo has unknown field(s): roles, height",
          "hobbit sam has unknown field(s): age",
          "there is a hobbit with missing name."
        ]);

        expect(res.body).toEqual({
          error: [
            "hobbit frodo has unknown field(s): roles, height",
            "hobbit sam has unknown field(s): age",
            "there is a hobbit with missing name."
          ]
        });
      });
  });
});
