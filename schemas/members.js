const { param } = require('express-validator');

const membersByIdSchema = [
    param('id').isNumeric().withMessage('id must be a number'),
];

module.exports = membersByIdSchema;
