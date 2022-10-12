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
  static async modifyComment(req, res) {
    try {
      const { id } = req.params;
      const { body } = req.body;

      const resultUpdate = await CommentDao.updateComment({ id }, { body });

      return res.status(200).json({
        resultUpdate,
      });
    } catch (error) {
      return res.status(500).json({
        msg: `Error while updating comment`,
      });
    }
  }
}

module.exports = CommentsControllers;
