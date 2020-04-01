const db = require("../../data/dbConfig.js");

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById
};

const { getInsertedIds } = require("./modelHelpers");
function insert(hobbit) {
  return db("hobbits")
    .insert(hobbit, "id")
    .then(ids => {
      if (Array.isArray(hobbit)) {
        // for bulk insert
        const insertedIds = getInsertedIds(ids[0], hobbit);
        return db("hobbits").whereIn("id", insertedIds);
      } else {
        return db("hobbits")
          .where({ id: ids[0] })
          .first();
      }
    });
}

function update(id, changes) {
  return db("hobbits")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("hobbits")
    .where({ id })
    .del();
}

function getAll() {
  return db("hobbits");
}

function findById(id) {
  return db("hobbits")
    .where({ id })
    .first();
}

// const a = getInsertedIds(10, ["a", "b", "c", 6]);
// console.log(a);
