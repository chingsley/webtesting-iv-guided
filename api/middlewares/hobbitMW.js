const validateSingleHobbit = (req, res, next) => {
  if (Array.isArray(req.body)) {
    return next();
  }
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      error: "missing name for the hobbit"
    });
  } else if (Object.keys(req.body).length > 1) {
    const fields = Object.keys(req.body);
    const unknownFields = fields.filter(field => field != "name").join(", ");
    res.status(400).json({
      error: `unknown field(s): '${unknownFields}'`
    });
  } else {
    next();
  }
};

const validateBulkHobbit = (req, res, next) => {
  if (Array.isArray(req.body)) {
    const hobbits = req.body;
    const errors = [];
    for (let i = 0; i < hobbits.length; i++) {
      const { name } = hobbits[i];
      if (!name) {
        errors.push("there is a hobbit with missing name.");
      } else if (Object.keys(hobbits[i]).length > 1) {
        const fields = Object.keys(hobbits[i]);
        const unknownFields = fields
          .filter(field => field != "name")
          .join(", ");
        errors.push(`hobbit ${name} has unknown field(s): ${unknownFields}`);
      }
    }
    if (errors.length > 0) {
      return res.status(400).json({ error: errors });
    } else {
      return next();
    }
  } else {
    return next();
  }
};

module.exports = {
  validateSingleHobbit,
  validateBulkHobbit
};
