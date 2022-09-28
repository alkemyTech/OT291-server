var express = require('express');
var router = express.Router();

const UserController = require('../controllers/user-controller.js');
const RoleMiddleware = require('../middlewares/verify-role.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.delete('/:id', UserController.deleteUser);

router.get('/users', RoleMiddleware.isAdminRole, UserController.getUsersList);

module.exports = router;
