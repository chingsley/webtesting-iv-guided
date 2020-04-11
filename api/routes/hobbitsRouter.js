const express = require('express');
const {
  getAllHobbits,
  createHobbit,
  getHobbitById,
  updateHobbit,
  removeHobbit,
} = require('../controller/hobbitsController');
const {
  validateHobbitId,
  validateBulkHobbit,
  validateSingleHobbit,
} = require('../middlewares/hobbitMW');
const router = express.Router();

router.get('/', getAllHobbits);
router.post('/', validateSingleHobbit, validateBulkHobbit, createHobbit);
router.get('/:id', validateHobbitId, getHobbitById);
router.put('/:id', validateHobbitId, validateSingleHobbit, updateHobbit);
router.delete('/:id', validateHobbitId, removeHobbit);

module.exports = router;
