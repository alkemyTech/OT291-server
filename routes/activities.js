const express = require('express');
const router = express.Router();
const RoleMiddleware = require('../middlewares/verify-role')
const ActivitiesController = require('../controllers/activitiesController')

router.post('/', RoleMiddleware.isAdminRole, ActivitiesController.createActivities);


module.exports = router;
