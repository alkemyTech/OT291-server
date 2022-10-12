const CommentDao = require('../dao/comments');

class CommentsControllers {
  static async deleteComment(req, res) {
    const { id } = req.params;
    try {
      const deletedComment = await CommentDao.deleteComment(id);
      if (deletedComment) {
        return res.status(200).json({ msg: 'Comment deleted successfully' });
      }
      return res.status(404).json({ msg: 'Comment not found' })
    } catch (error) {
      res.status(400).json({ msg: 'Something went wrong' });
    }
  }
}

module.exports = CommentsControllers;
