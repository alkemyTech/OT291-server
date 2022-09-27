const express = require('express');
const router = express.Router();
const RoleMiddleware = require('../middlewares/verify-role');
const ActivitiesController = require('../controllers/activitiesController');
const ValidationErrors = require('../middlewares/validationErrors');
const activitiesSchema = require('../schemas/activities');

router.post(
  '/',
  RoleMiddleware.isAdminRole,
  activitiesSchema,
  ValidationErrors.validateSchema,
  ActivitiesController.createActivities
);

module.exports = router;
