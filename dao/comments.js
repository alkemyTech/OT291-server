const { Comment } = require('../models');

class CommentDao {
  static async listCommentsByPost(id) {
    try {
      const comments = await Comment.findAll({
        where: {
          post_id: id,
        },
        attributes: ['body'],
      });
      return comments.length ? comments : 'No matches found';
    } catch (error) {
      throw new Error('Error. The query could not be performed.');
    }
  }
}

module.exports = CommentDao;
