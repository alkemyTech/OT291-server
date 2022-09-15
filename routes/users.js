var express = require('express');
var router = express.Router();

const UserController = require('../controllers/user-controller');
const userController = new UserController();
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await userController.deleteUser(id);
    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
