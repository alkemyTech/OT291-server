const { Comments } = require('../models');
const CommentDao = require('../dao/comments');

class CommentsControllers {
  static async getComments(req, res) {
    try {
      const { id } = req.params;
      const comments = await CommentDao.listCommentsByPost(id);
      res.status(200).json(comments);
    } catch (error) {
      res.status(400).json('Error. The query could not be performed.');
    }
  }
  static async createComment(req, res) {
    const { body, post_id, user_id } = req.body;
    try {
      const comment = await CommentDao.createComment({
        body,
        post_id,
        user_id,
      });
      return res.status(200).json(comment);
    } catch (error) {
      res.status(500).send('error al crear comentario');
    }
  }
}

module.exports = CommentsControllers;
