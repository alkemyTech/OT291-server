const express = require('express');
const router = express.Router();
const ValidationErrors = require('../middlewares/validationErrors');
const CommentsController = require('../controllers/commentsController');
const { commentsByIdSchema } = require('../schemas/comments');
const RoleMiddleware = require('../middlewares/verify-role');

router.get(
  '/:id/comments',
  commentsByIdSchema,
  ValidationErrors.validateSchema,
  CommentsController.getComments
);

router.get('/',  
RoleMiddleware.isAdminRole, 
CommentsController.getAllComments);

module.exports = router;
