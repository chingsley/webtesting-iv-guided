const express = require("express");
const Hobbits = require("../models/hobbitsModel.js");
const {
  getAllHobbits,
  createHobbit,
  getHobbitById,
  updateHobbit,
  removeHobbit
} = require("../controller/hobbitsController");
const {
  validateBulkHobbit,
  validateSingleHobbit
} = require("../middlewares/hobbitMW");
const router = express.Router();

router.get("/", getAllHobbits);
router.post("/", validateSingleHobbit, validateBulkHobbit, createHobbit);
router.get("/:id", getHobbitById);
router.put("/:id", validateSingleHobbit, updateHobbit);

module.exports = router;
