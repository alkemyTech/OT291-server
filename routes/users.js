var express = require('express');
var router = express.Router();

const UserController = require('../controllers/user-controller.js');
const { userSchema, loginSchema } = require('../schemas/user');
const ValidationErrors = require('../middlewares/validationErrors');
const RoleMiddleware = require('../middlewares/verify-role.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.delete('/:id', RoleMiddleware.isAdminRole, UserController.deleteUser);

router.patch(
  '/:id',
  loginSchema,
  userSchema,
  ValidationErrors.validateSchema,
  RoleMiddleware.isOwner,
  UserController.updateUser
);

router.get('/users', RoleMiddleware.isAdminRole, UserController.getUsersList);

module.exports = router;
