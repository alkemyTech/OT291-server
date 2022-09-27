const { param } = require('express-validator');

const getByIdSchema = [
  param('id').isNumeric().withMessage("id must be a number")]
  module.exports = {getByIdSchema};