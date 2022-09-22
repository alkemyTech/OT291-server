var express = require('express');
var router = express.Router();

const UserController = require('../controllers/user-controller.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.delete('/:id', UserController.deleteUser);
router.patch('/:id', UserController.updateUser);

module.exports = router;
