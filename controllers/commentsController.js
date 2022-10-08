const CommentDao = require('../dao/comments');

class CommentsControllers {
  static async deleteComment(req, res) {
    const { id } = req.params;
    try {
      const deletedComment = await CommentDao.deleteComment(id);
      res.status(200).json({ msg: 'Comment deleted successfully' });
    } catch (error) {
      res.status(400).json({ msg: 'Could not find a comment' });
    }
  }
}

module.exports = CommentsControllers;
