const supertest = require("supertest");
const server = require("../api/server.js");

describe("server", () => {
  describe("GET /", () => {
    // asynchronous test need to either return the promise
    it("responds with 200 OK", () => {
      return supertest(server)
        .get("/api")
        .expect(200);
    });

    // or use the async/await
    it("responds with 200 OK", async () => {
      await supertest(server)
        .get("/api")
        .expect("Content-Type", /json/i);
    });

    // using done
    it("responds with correct status", done => {
      supertest(server)
        .get("/api")
        .expect(200, done);
    });

    it("responds with 200 OK and { api: 'up' }", async () => {
      await supertest(server)
        .get("/api")
        .then(res => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual({ api: "up" });
        });
    });
  });
});
