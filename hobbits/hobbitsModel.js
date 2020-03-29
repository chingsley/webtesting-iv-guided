const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById
};

function insert(hobbit) {
  return db("hobbits")
    .insert(hobbit, "id")
    .then(ids => {
      if (ids.length > 1) {
        // for bulk insert
        return db("hobbits");
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
