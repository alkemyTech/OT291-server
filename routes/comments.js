const express = require('express');
const router = express.Router();
const ValidationErrors = require('../middlewares/validationErrors');
const CommentsController = require('../controllers/commentsController');
const { commentsByIdSchema } = require('../schemas/comments');

router.get(
  '/:id/comments',
  commentsByIdSchema,
  ValidationErrors.validateSchema,
  CommentsController.getComments
);

module.exports = router;
