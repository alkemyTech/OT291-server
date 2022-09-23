var express = require('express');
var router = express.Router();

const UserController = require('../controllers/activitiesController');

router.put('/:id', UserController.updateActivitie);

module.exports = router;