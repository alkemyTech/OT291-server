var express = require('express');
var router = express.Router();
const userSchema = require('../schemas/user');
const { validateSchema } = require('../middlewares/validationErrors');
const { post } = require('../controllers/user-controller');

/* POST new user. */
router.post('/register', validateSchema(userSchema), post);

module.exports = router;
