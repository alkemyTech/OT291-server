const { param, body } = require('express-validator');

const findByIdSchema = [
    param("id").isNumeric().withMessage("id must be a number")
]

module.exports = findByIdSchema;