const { validationResult } = require('express-validator');
const { error } = require('../utils/response');

/**
 * Validation Middleware
 * Checks express-validator results and returns standard error
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return error(res, 'Validation Error', formattedErrors, 400);
  }

  next();
};

module.exports = validate;
