const express = require('express');
const router = express.Router();
const News = require('../controllers/news');
const ValidationErrors = require('../middlewares/validationErrors');
const RoleMiddleware = require('../middlewares/verify-role');
const {getByIdSchema} = require('../schemas/news');

router.get("/:id",RoleMiddleware.isAdminRole,getByIdSchema,ValidationErrors.validateSchema,News.DetailNew)

module.exports = router;