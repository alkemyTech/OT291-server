const express = require('express');
const router = express.Router();
const CommentsControllers = require('../controllers/commentsController');
const RoleMiddleware = require('../middlewares/verify-role');
const ValidationErrors = require('../middlewares/validationErrors');
const CommentsController = require('../controllers/commentsController');
const {
  createCommentSchema,
  commentsByIdSchema,
} = require('../schemas/comments');

router.post(
  '/',
  createCommentSchema,
  ValidationErrors.validateSchema,
  CommentsController.createComment
);

router.delete('/:id',  RoleMiddleware.isOwnerOfComment, CommentsControllers.deleteComment)


router.get(
  '/:id/comments',
  commentsByIdSchema,
  ValidationErrors.validateSchema,
  CommentsController.getComments
);

module.exports = router;
