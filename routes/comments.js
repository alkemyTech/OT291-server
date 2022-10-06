var express = require('express');
var router = express.Router();
const CommentsController = require('../controllers/commentsController')
const RoleMiddleware = require('../middlewares/verify-role');

router.get('/', 
RoleMiddleware.isAdminRole, 
CommentsController.getAllComments);

module.exports = router;