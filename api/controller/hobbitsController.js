const Hobbits = require('../models/hobbitsModel');

const getAllHobbits = (req, res, next) => {
  Hobbits.getAll()
    .then((hobbits) => {
      res.status(200).json(hobbits);
    })
    .catch((error) => {
      next(error.message);
      // res.status(500).json({ error: error.message });
    });
};

const createHobbit = (req, res, next) => {
  Hobbits.insert(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      next(error.message);
      // res.status(500).json({ error: error.message });
    });
};

const getHobbitById = (req, res) => {
  res.status(200).json(req.hobbit);
};

const updateHobbit = (req, res) => {
  Hobbits.update(req.params.id, req.body)
    .then(async (result) => {
      if (result > 0) {
        const updatedHobbit = await Hobbits.findById(req.params.id);
        return res.status(200).json({
          message: 'updated successfully',
          updatedHobbit,
        });
      } else {
        return res.status(500).json({
          error: 'no updates executed',
        });
      }
    })
    .catch((error) => {
      next(error.message);
      // return res.status(500).json({ error: error.message });
    });
};

const removeHobbit = async (req, res, next) => {
  Hobbits.remove(req.params.id)
    .then((result) => {
      if (result) {
        return res.status(200).json({ message: 'hobbit deleted.' });
      } else {
        return res.status(404).json({ error: 'hobbit not found.' });
      }
    })
    .catch((err) => {
      return next(err.message);
    });
};

module.exports = {
  getAllHobbits,
  createHobbit,
  getHobbitById,
  updateHobbit,
  removeHobbit,
};
