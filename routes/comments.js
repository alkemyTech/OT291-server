var express = require('express');
var router = express.Router();
const CommentsController = require('../controllers/commentsController')

router.get('/', CommentsController.getAllComments);

module.exports = router;