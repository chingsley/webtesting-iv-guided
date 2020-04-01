const {
  insert,
  remove,
  update,
  getAll
} = require("../../api/models/hobbitsModel");
const hobbits = require("../testData");

const addHobbits = async () => {
  const inserted = await insert(hobbits);
  return inserted;
};

module.exports = {
  addHobbits
};
