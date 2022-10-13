const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentsController');
const verifyRole = require('../middlewares/verify-role');

router.put(
  '/:id',
  verifyRole.isOwnerOfComment,
  CommentController.modifyComment
);

module.exports = router;
