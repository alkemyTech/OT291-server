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
}

module.exports = CommentsControllers;
