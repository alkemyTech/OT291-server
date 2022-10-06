const express = require('express');
const router = express.Router();
const ValidationErrors = require('../middlewares/validationErrors');
const CommentsController = require('../controllers/commentsController');
const {createCommentSchema} = require('../schemas/comments');

router.post("/",
    createCommentSchema,
    ValidationErrors.validateSchema
    ,CommentsController.createComment)


module.exports = router;
