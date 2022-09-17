var express = require('express');
var router = express.Router();
const { post } = require('../controllers/user-controller');

/* POST new user. */
router.post('/register', post);

module.exports = router;
