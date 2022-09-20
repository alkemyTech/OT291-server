var express = require('express');
var router = express.Router();
const userSchema = require('../schemas/user');
const ValidationErrors = require('../middlewares/validationErrors');
const UserController = require('../controllers/user-controller');

router.post(
  '/register',
  ValidationErrors.validateSchema(userSchema),
  UserController.post
);

module.exports = router;
