var express = require('express');
var router = express.Router();
const RoleMiddleware = require('../middlewares/verify-role');
const UserController = require('../controllers/activitiesController');

router.put('/:id', RoleMiddleware.isAdminRole, UserController.updateActivitie);

module.exports = router;