const supertest = require("supertest");
const db = require("../../data/dbConfig");
const { addHobbits } = require("../helpers/helpers");
const server = require("../../api/server");

describe("hobbitsController", () => {
  beforeEach(async () => {
    await db("hobbits").truncate();
  });

  describe("getAllHobbits", () => {
    it("responds with 200 OK", () => {
      return supertest(server)
        .get("/api/hobbits")
        .expect(200);
    });

    it("returns an array of all inserted hobbits", async () => {
      await addHobbits();
      const hobbits = await db("hobbits");
      await supertest(server)
        .get("/api/hobbits")
        .then(res => {
          expect(res.body).toHaveLength(hobbits.length);
          expect(res.body).toEqual(hobbits);
        });
    });
  });

  describe("createHobbit", () => {
    it("returns status 201 for successful creation", async () => {
      const hobbit = { name: "frodo" };
      return supertest(server)
        .post("/api/hobbits")
        .send(hobbit)
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it("returns an object having the name and id of single created hobbit", async () => {
      const hobbit = { name: "frodo" };
      return supertest(server)
        .post("/api/hobbits")
        .send(hobbit)
        .then(res => {
          expect(res.body).toHaveProperty("name", "frodo");
          expect(res.body).toHaveProperty("id");
        });
    });

    it("returns an array of the inserted hobbits for bulk creation", async () => {
      const hobbits = [{ name: "frodo" }, { name: "sam" }];
      await supertest(server)
        .post("/api/hobbits")
        .send(hobbits)
        .then(res => {
          expect(res.status).toBe(201);
          expect(res.body).toHaveLength(2);
          expect(res.body).toEqual([
            { id: 1, name: "frodo" },
            { id: 2, name: "sam" }
          ]);
          for (let i = 0; i < res.body.length; i++) {
            expect(res.body[i]).toHaveProperty("id");
          }
        });
    });
  });

  describe("updateHobbit", () => {
    it("successfully updates a hobbit returning status 200", async () => {
      const ids = await db("hobbits").insert({ name: "frodo" });
      return supertest(server)
        .put(`/api/hobbits/${ids[0]}`)
        .send({ name: "sam" })
        .then(res => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual({
            message: "updated successfully",
            updatedHobbit: { id: 1, name: "sam" }
          });
        });
    });
  });
});
