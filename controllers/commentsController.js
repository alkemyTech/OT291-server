const { Comments } = require('../models');
const CommentDao = require('../dao/comments');

class CommentsControllers {
  static async deleteComment(req, res) {
    const { id } = req.params;
    try {
      const deletedComment = await CommentDao.deleteComment(id);
      if (deletedComment) {
        return res.status(200).json({ msg: 'Comment deleted successfully' });
      }
      return res.status(404).json({ msg: 'Comment not found' });
    } catch (error) {
      res.status(400).json({ msg: 'Something went wrong' });
    }
  }

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

  static async getAllComments(req, res) {
    const attributes = ['body'];
    const order = [['createdAt', 'DESC']];
    let getAllComments;
    try {
      getAllComments = await CommentDao.getAllComments(attributes, order);
    } catch (error) {
      return res.status(404).json(error);
    }
    getAllComments.length
      ? res.status(200).json(getAllComments)
      : res.status(404).json({ msg: 'Could not find Comments' });
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
