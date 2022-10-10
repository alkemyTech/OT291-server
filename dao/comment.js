const db = require('../models');
const { Comment } = db;

class CommentDao {
  static async updateComment(where, data) {
    try {
      const commentUpdated = await Comment.update(data, {
        where: where,
      });

      if (commentUpdated[0] < 1) {
        return 'Comment not found';
      }

      return 'Comment updated succesfully';
    } catch (error) {
      throw new Error('Error Comment not updated');
    }
  }
}

module.exports = CommentDao;
