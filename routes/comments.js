const express = require('express');
const router = express.Router();
const CommentsControllers = require('../controllers/commentsController');
const RoleMiddleware = require('../middlewares/verify-role');

router.delete('/:id',  RoleMiddleware.isOwner, CommentsControllers.deleteComment)

module.exports = router;

