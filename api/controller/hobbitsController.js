const Hobbits = require("../models/hobbitsModel");

const getAllHobbits = (req, res, next) => {
  Hobbits.getAll()
    .then(hobbits => {
      res.status(200).json(hobbits);
    })
    .catch(error => {
      // next(error);
      res.status(500).json({ error: error.message });
    });
};

const createHobbit = (req, res) => {
  // const hobbit = req.body;
  Hobbits.insert(req.body)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};

const getHobbitById = (req, res) => {};

const updateHobbit = (req, res) => {
  Hobbits.update(req.params.id, req.body)
    .then(async result => {
      if (result > 0) {
        const updatedHobbit = await Hobbits.findById(req.params.id);
        return res.status(200).json({
          message: "updated successfully",
          updatedHobbit
        });
      } else {
        return res.status(500).json({
          error: "no updates executed"
        });
      }
    })
    .catch(error => {
      return res.status(500).json({ error: error.message });
    });
};

const removeHobbit = (req, res) => {};

module.exports = {
  getAllHobbits,
  createHobbit,
  getHobbitById,
  updateHobbit,
  removeHobbit
};
