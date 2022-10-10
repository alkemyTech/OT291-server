const CommentDao = require('../dao/comment');

class CommentsControllers {
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
